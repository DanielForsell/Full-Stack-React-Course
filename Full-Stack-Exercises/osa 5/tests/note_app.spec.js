const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith } = require('./helper')
const { createNote } = require('./helper')


describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Daniel Forsell',
        username: 'DanielF',
        password: 'DanielF'
      }
    })

    await request.post('/api/users', {
      data: {
        name: 'Daniel',
        username: 'DanielF2',
        password: 'DanielF2'
      }
    })
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2023')).toBeVisible()
  })

  test('User can log in', async ({ page }) => {

    await loginWith(page, 'DanielF', 'DanielF')
    await expect(page.getByText('Daniel Forsell logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'Dan', 'dan')

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('wrong username or password')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Daniel Forsell logged in')).not.toBeVisible()
  })


  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'DanielF', 'DanielF')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright', 'a note created by playwright', 'a note created by playwright', '1')
      await expect(page.getByText('Title:a note created by playwright')).toBeVisible()
    })

    describe('And a note exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'a note created by playwright', 'a note created by playwright', 'a note created by playwright', '1')
      })

      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: 'make not important' }).click()
        await expect(page.getByText('make important')).toBeVisible()
      })

      test('note can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('votes:2')).toBeVisible()
      })

      test('note can be deleted', async ({ page }) => {
        page.on('dialog', async dialog => {
          if (dialog.type() === 'confirm') {
            await dialog.accept()
          }
        })
        await page.getByRole('button', { name: 'Delete' }).click()

        await expect(page.getByText('Title:a note created by playwright')).not.toBeVisible()
      })

      test('only logged in author can delete', async ({ page }) => {
        await page.getByRole('button', { name: 'Logout' }).click()
        await loginWith(page, 'DanielF2', 'DanielF2')

        await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
      })

    })

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first', 'first note', 'first note', '1')
        await createNote(page, 'second note', 'second note', 'second note', '2')
        await createNote(page, 'third note', 'third note', 'third note', '3')
      })

      test('one of those can be made nonimportant', async ({ page }) => {
        const element = await page.getByText('Title:third note')
        const otherdNoteElement = await page.getByRole('button', { name: 'make not important' }).nth(1)
        await otherdNoteElement.click()
        await expect(element.getByText('make important')).toBeVisible()
      })
    })

  
  })



})
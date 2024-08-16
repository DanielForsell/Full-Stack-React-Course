const loginWith = async (page, username, password)  => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
  }
  

const createNote = async (page, author, title, url, votes) => {
    await page.getByRole('button', { name: 'new note' }).click()

      await page.getByTestId('author').fill(author)
      await page.getByTestId('title').fill(title)
      await page.getByTestId('url').fill(url)
      await page.getByTestId('votes').fill(votes)

      await page.getByRole('button', { name: 'Create' }).click()
      await page.getByText(`Title:${title}`).waitFor()
    }
  export { loginWith, createNote }
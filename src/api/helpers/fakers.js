module.exports = ({
  faker
}) => {

  const fakeFullName = () => {
    const firstName = faker.name.firstName()
    const fullName = faker.name.lastName()
    return String()
      .concat(firstName)
      .concat(' ')
      .concat(fullName)
  }

  const fakeEmail = (firstName = null, lastName = null) => {
    if (!firstName || !lastName) {
      return faker.internet.email()
    }
    else {
      const [_, sufix] = faker.internet.email().split('@')
      return String()
        .concat(lastName.toLocaleLowerCase())
        .concat('_')
        .concat(firstName.toLocaleLowerCase())
        .concat('@')
        .concat(sufix)
    }
  }

  const fakeUUID = () => {
    return faker.random.uuid()
  }

  const fakerUser = () => {
    const id = fakeUUID()
    const fullName = fakeFullName()
    const [firstName, lastName] = fullName.split(' ')
    const email = fakeEmail(firstName, lastName)
    return { id, fullName, email }
  }

  return {
    fakeEmail,
    fakeFullName,
    fakeUUID,
    fakerUser
  }

}

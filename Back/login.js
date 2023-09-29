export const login = (body, users) => {
    const { username, pass } = body
    let i = 0
    while (i < users.length) {
        if (username === users[i].username && pass === users[i].pass) return true
        i++
    }
    return false
}
export const register = (body, users) => {
    const { username } = body
    let i = 0
    while (i < users.length) {
        if (username === users[i].username) return false
        i++
    }
    return true
}
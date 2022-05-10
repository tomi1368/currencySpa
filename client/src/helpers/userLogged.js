
export const isLogged = ()=>localStorage.getItem("user-currency") 

export const loggedUser = ()=> JSON.parse(localStorage.getItem("user-currency")) 
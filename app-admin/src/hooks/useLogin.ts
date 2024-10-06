export function useLogin():Boolean{
    const user = localStorage.getItem("username");
    return!(user===null||"");
}

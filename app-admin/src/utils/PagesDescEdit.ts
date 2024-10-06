import myAxios from './Axios'

export async function getPageDesc(id:String):Promise<any>{
    return await myAxios.get("/pagesDesc/pageId/"+id)
}
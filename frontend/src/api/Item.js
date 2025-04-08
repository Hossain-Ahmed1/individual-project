
export const fetchItems = async() =>{
    const res = await fetch(`/api/items`)
    const data = (await res.json()).data
    return data
}
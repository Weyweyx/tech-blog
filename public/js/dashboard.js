const newpostbutton = document.getElementById("newpostbutton")
const newpostform = document.getElementById("newpostform")
const postedits = document.getElementsByClassName("postedit")
const postbuttons = document.getElementsByClassName("postbuttons")
const postdeletebuttons = document.getElementsByClassName("postbuttondelete")
const posteditbuttons = document.getElementsByClassName("postbuttonedit")
const postcontainer = document.getElementById("postcontainer")
const posteditform = document.getElementsByClassName("posteditform")
const posteditformcontainer = document.getElementsByClassName("posteditformcontainer")

newpostform.style.display = "none"

Array.from(postbuttons).forEach((buttons)=>{
    buttons.style.display = "none"
})

Array.from(posteditformcontainer).forEach((buttons)=>{
    buttons.style.display = "none"
})

Array.from(posteditbuttons).forEach((button,i)=>{
    const selectedposteditsformcontainer = posteditformcontainer[i]
    button.onclick = ()=>{
        selectedposteditsformcontainer.style.display = "flex"
    }
    
})

Array.from(postdeletebuttons).forEach(async(button,i)=>{
    button.onclick = async()=> {
        const post = postedits[i]
    try{
        const res = await fetch(`/api/posts/${post.id.slice("postedit-".length)}`,{
            method: "DELETE"
        })
        const resjson = await res.json()
        post.remove()
        location.href = "/dashboard"
    }
    catch(error){
        console.log ("error", error)
    }
    }
})

newpostbutton.onclick = () => {
    console.log ("click")
    if (newpostform.style.display === "none"){
        newpostform.style.display = "flex"
    }
    else if (newpostform.style.display === "flex"){
        newpostform.style.display = "none"
    }
}

Array.from(postedits).forEach((post,i)=>{
    const indexpostbuttons = document.getElementById(`postbuttons-${i}`)
    post.onclick = ()=>{
    indexpostbuttons.style.display = "flex"
    }
    
})

Array.from(posteditform).forEach((post,i)=>{
    post.onsubmit = async(e)=>{
        e.preventDefault()
        const formdata = new FormData(e.target)
        const submitdata = {
            title: formdata.get("title"),
            content: formdata.get("content")
        }

        const res = await fetch(`/api/posts/${post.id.slice("posteditform-".length)}`, {
            method: "PUT",
            headers: {
                "content-type":"application/json"
            },
            body:JSON.stringify({title: formdata.get("title"),content: formdata.get("content")})
        })
        const resjson = await res.json()
        console.log (resjson)
        if(resjson.length){
            location.href = "/dashboard"
        }

    
    }
    
})

if(newpostform){
    newpostform.onsubmit = async (e)=>{
        e.preventDefault()
    
        const formdata = new FormData(e.target)
        try{
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "content-type":"application/json"
                },
                body:JSON.stringify({title: formdata.get("title"),content: formdata.get("content")})
            })
            const resjson = await res.json()
            console.log (resjson)
            if(resjson.user_id){
                location.href = "/dashboard"
            }
        }catch(err){
            console.log (err)
        }
    }
}
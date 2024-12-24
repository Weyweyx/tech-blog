const loginform = document.getElementById('loginform')
const signupform = document.getElementById('signupform')
const logout = document.getElementById('logout')
const postcommentforms = document.getElementsByClassName('postcommentform')


console.log ('helloworld')

if(logout){
    const handlelogout = async () => {
        try{
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "content-type":"application/json"
                },
            })
            location.href = "/"
        }catch(err){
            console.log (err)
        }
    }
    handlelogout()
}
if(loginform){
    loginform.onsubmit = async (e)=>{
        e.preventDefault()
    
        const formdata = new FormData(e.target)
        try{
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "content-type":"application/json"
                },
                body:JSON.stringify({username: formdata.get("username"),password: formdata.get("password")})
            })
            const resjson = await res.json()
            console.log (resjson)
            if(resjson.user){
                location.href = "/"
            }
        }catch(err){
            console.log (err)
        }
    }
}

if(signupform){
    signupform.onsubmit = async (e)=>{
        e.preventDefault()
    
        const formdata = new FormData(e.target)
        try{
            const res = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "content-type":"application/json"
                },
                body:JSON.stringify({username: formdata.get("username"),password: formdata.get("password")})
            })
            const resjson = await res.json()
            console.log (resjson)
            if(resjson.user){
                location.href = "/dashboard"
            }
        }catch(err){
            console.log (err)
        }
    }
}

Array.from(postcommentforms).forEach((post,i)=>{
    post.onsubmit = async(e)=>{
        e.preventDefault()
        const formdata = new FormData(e.target)
        const submitdata = {
            content: formdata.get("content"),
            //user_id: "1",
            post_id: post.id.slice("postcommentform-".length)
        }

        const res = await fetch(`/api/comments/`, {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body:JSON.stringify(submitdata)
        })
        console.log ("res", res)
        const resjson = await res.json()
        console.log (resjson)
        if(resjson.user_id){
            location.href = "/"
        }

    
    }
    
})

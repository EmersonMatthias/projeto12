import express from "express"
import cors from "cors"

const app = express()



app.use(cors())
app.use(express.json())

const users = []
const tweets = []

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body
    let isURL = false;

    function checkUrl(string) {
        try {
            let url = new URL(string)
            isURL = true
        } catch (err) {
            isURL = false
        }
    }
    checkUrl(avatar)

    if (!username || !isURL) {
        return res.send("Preencha todos os dados")
    }

    users.push(req.body)

    res.send("OK")
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body

    let temConta = false;

    const user = users.find((object) => {
        if (object.username === username) {
            temConta = true
            console.log("Tem conta")
            return object.username
        } else{
            console.log("Não tem conta")
        }
    })

    if(!temConta || !username || !tweet){
        return res.send("Por favor, verifique os dados")
    }

    const newTweet = {
        username,
        avatar: user.avatar,
        tweet
    }

    tweets.push(newTweet)

    res.send("OK")
})

app.get("/tweets", (req, res) => {
    const lastTweets = []

    for(let i = 1; i <= 10; i++){
        lastTweets.push(tweets[tweets.length-i])
    }
    
    res.send(lastTweets)
})
 

app.listen(5000, () => { console.log("Server Online") })
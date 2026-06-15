const express = require("express")
const router = express.Router()
const path = require("path")

router.get("/home/admin", (req,res)=>{

    if(!req.session.usuario){
        return res.redirect("/")
    }

    res.sendFile(path.join(__dirname,"../public/admin.html"))

})

module.exports = router
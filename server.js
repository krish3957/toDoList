const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const e = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", 'ejs');

mongoose.connect("mongodb+srv://krish3957:Krish%40836@cluster0.c8y73gg.mongodb.net/toDoListDB");

const itemSchema = mongoose.Schema({
    name: String
})

const schemaModel = mongoose.model("Item", itemSchema, "items");

const i1 = new schemaModel({
    name: "Cook Food"
});

const i2 = new schemaModel({
    name: "Coding"
});

const i3 = new schemaModel({
    name: "Exercise"
});

const defaultItems = [i1, i2, i3];

// schemaModel.insertMany(defaultItems);

app.get("/", function (req, res) {
    schemaModel.find({}).then(function (result) {
        res.render("list", { listTitle: "Today", newListItem: result });
    })

});



const listSchema = mongoose.Schema({
    name: String,
    items: [itemSchema]
});

const List = mongoose.model("List", listSchema, "lists");

app.get("/:customListName", function (req, res) {
    const customListName = req.params.customListName;

    List.findOne({ name: customListName }).then(function (result) {
        if (!result) {
            const list = new List({
                name: customListName,
                items: defaultItems
            });
            list.save();
            res.redirect("/" + customListName);
        }
        else {
            res.render("list", { listTitle: result.name, newListItem: result.items });
        }
    })

});



app.post("/", function (req, res) {

    const listName = req.body.list;
    const itemName = req.body.item;

    const i4 = new schemaModel({
        name: req.body.item
    });

    if (listName == "Today") {
        i4.save();
        res.redirect("/");
    }
    else {
        List.findOne({ name: listName }).then(function (result) {
            result.items.push(i4);
            result.save();
            res.redirect("/" + listName);
        })
    }
});


app.post("/delete", function (req, res) {

    const v1 = req.body.checked;
    const deletePage = req.body.pageName;
    // console.log(req);
    if(deletePage == "Today")
    {
        schemaModel.deleteOne({ _id: v1 }).then(function () {
            console.log("Data deleted"); // Success
        }).catch(function (error) {
            console.log(error); // Failure
        });
        res.redirect("/");
    }
    else{
        List.findOneAndUpdate({ name: deletePage },{$pull:{items:{_id:v1}}}).then(function(){
            console.log("Deleted");
            res.redirect("/" + deletePage );
        }).catch(function(error){
            console.log(error);
        })
    }
})


app.get("/work", function (req, res) {
    res.render("list", { listTitle: "work", newListItem: workItems });
})

app.get("/about", function (req, res) {
    res.render("about");
})

app.listen(3000, function () {
    console.log('Server started on port 3000');
})
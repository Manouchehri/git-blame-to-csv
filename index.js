var Git = require("nodegit");

var program_name = process.argv[0]; //value will be "node"
var script_path = process.argv[1]; //value will be "yourscript.js"
var first_value = process.argv[2]; //value will be "banana"
var second_value = process.argv[3]; //value will be "monkey"

console.log(script_path)
console.log(script_path)
console.log(first_value)
console.log(second_value)

var getMostRecentCommit = function(repository) {
    return repository.getBranchCommit("master");
};

var getCommitMessage = function(commit) {
    return commit.message();
};

Git.Repository.open(first_value)
    .then(function(repo) {
        return repo.getMasterCommit();
    })
    .then(function(firstCommitOnMaster) {
        return firstCommitOnMaster.getTree();
    })
    .then(function(tree) {
        // `walk()` returns an event.
        var walker = tree.walk();
        walker.on("entry", function(entry) {
            console.log(entry.path());
        });

        // Don't forget to call `start()`!
        walker.start();
    })
    
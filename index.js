var Git = require("nodegit");

var program_name = process.argv[0]; //value will be "node"
var script_path = process.argv[1]; //value will be "yourscript.js"
var first_value = process.argv[2]; //value will be "banana"
var second_value = process.argv[3]; //value will be "monkey"

console.log(script_path)
console.log(script_path)
console.log(first_value)
console.log(second_value)

// var getMostRecentCommit = function(repository) {
//     return repository.getBranchCommit("master");
// };

// var getCommitMessage = function(commit) {
//     return commit.message();
// };

Git.Repository.open(first_value)
    .then(async function(repo) {
        let firstCommitOnMaster = await repo.getMasterCommit();
        let tree = await firstCommitOnMaster.getTree();

        var walker = tree.walk();
        walker.on("entry", function(entry) {
            console.log(entry.path());
            Git.Blame.file(repo, entry.path(), []).then(function(blame) {
                for(let i = 0; i < blame.getHunkCount(); i++) {
                    let hunk = blame.getHunkByIndex(i);
                    for(let y = 0; y < hunk.linesInHunk(); y++) {
                        console.log(entry.path() + "," + (hunk.finalStartLineNumber() + y) + "," + hunk.finalCommitId() + "," + hunk.finalSignature().name() + "," + hunk.finalSignature().email() + "," + hunk.finalSignature().when().time() + "," + hunk.finalSignature().when().offset()+ "," + hunk.finalSignature().when().sign())
                    }
                    // console.log(hunk.finalSignature().email())
                }
                
            });
        });

        // Don't forget to call `start()`!
        walker.start();
    })
    
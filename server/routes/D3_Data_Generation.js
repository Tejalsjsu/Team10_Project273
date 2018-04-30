exports.generate_d3_tree_data = (result) => {
  let pagesVisited = result.pagesVisited;
  console.log("page visited: " + JSON.stringify(pagesVisited));
  let time_arr = [10,25,15,20,22,45,50,40,23,67,54,60,21,98,12,16];
  let tree_obj = null
  let parent = null;
  pagesVisited.forEach(function(pageName) {
    let timeVal = time_arr[Math.floor(Math.random() * time_arr.length)];
    let child_obj = {
      name: pageName,
      attributes: {
        name: pageName,
        Time: `${timeVal} seconds`
      },
      children: []
    };
    if (parent === null) {
      tree_obj = child_obj
    } else {
      parent.push(child_obj);
    }
    parent = child_obj.children;
  });
  console.log("tree object :  " + JSON.stringify(tree_obj));
  return tree_obj;
}

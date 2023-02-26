//  Term Data Format
//
//  {
//    "term1": {
//        "data-type1": "Answer",
//        "data-type2": "Answer"
//     }
//    "term2": {
//        "data-type1": "Answer",
//        "data-type2": "Answer"
//     }
//  }
// 
//

export default {
    "terms": {
        "apples": {
            "catagory": "fruit",
            "color": "fruit",
        },
        "oranges": {
            "catagory": "fruit",
            "color": "orange",
        },
        "banannas": {
            "catagory": "fruit",
            "color": "yellow",
        },
        "carrot": {
            "catagory": "vegetable",
            "color": "orange",
        }
    },
    "question-types": {
        "matching": ["catagory", "color"],
        "choice": ["catagory"]
    }
}
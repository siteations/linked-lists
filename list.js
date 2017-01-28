
'use strict';

const hash= require('./util.js').getSha1;

// Destructured assignment! Whoa! This "extracts" getSha1 from the util's exports object!
// It's equivalent to saying: const getSha1 = require('./util').getSha1;

function ListNode (value, next) {
    this.value = value ;
    this.next = next || null;
    this.id = hash(value);
}

ListNode.prototype.toString = function (){
    var stringSeries='';
    var runner = this;

    while (runner!== null){
        stringSeries += runner.id + ' ';

        runner=runner.next;
    }

    return '['+stringSeries.slice(0,-1)+']';
}

ListNode.prototype.length = function(){
    var cnt=0;
    var runner = this;

    while (runner!== null){
        cnt ++;
        runner=runner.next;
    }
    return cnt;

}

ListNode.prototype.prepend = function(newList){
    return new ListNode(newList, this);
}


ListNode.prototype.append = function(newList){
    //newList...
    var runner = this;


    if (runner.next === null){
        return new ListNode(runner.value, newList);
    } else {
        return new ListNode(runner.value, runner.next.append(newList));
    }

}

ListNode.prototype.remove = function(idNum){
    var runner=this;

    if (runner.next === null){
        //runner.next = runner.next.next; this is the mutible version.... must be a copy
        return new ListNode(runner.value);

    } else if (runner.id === idNum){
        //runner.next = runner.next.next; this is the mutible version.... must be a copy
        return runner.next;

    } else {

        return new ListNode(runner.value, runner.next.remove(idNum));
    }

}

ListNode.prototype.splitAt = function(idNum){
    var runner=this;

    if (runner.id === idNum){
        //runner.next = runner.next.next; this is the mutible version.... must be a copy
        return null;

    } else if (runner.next === null){
        //runner.next = runner.next.next; this is the mutible version.... must be a copy
        return new ListNode(runner.value);

    } else {

        return new ListNode(runner.value, runner.next.splitAt(idNum));
    }

}

//

ListNode.prototype.find = function(idNum){
    var run=this;

    if (runner.id === idNum){
        //runner.next = runner.next.next; this is the mutible version.... must be a copy
        console.log(runner.value);
        return new ListNode (runner.value, runner.next);

    } else if (runner.next === null){
        //runner.next = runner.next.next; this is the mutible version.... must be a copy
        return null;

    }
    else {
        return runner.next.find(idNum);
    }
}


//ListNode.prototype.check=function(){
//     (this.length>1)? this.next = next : this.next = null;
// }
/* want to use ES6? Try writing this as a class:
class ListNode {
  constructor (value, next) {}
}
*/


module.exports = { ListNode };
// Yow! Even more destructured assignment
// This is the same as: module.exports = { ListNode: ListNode };

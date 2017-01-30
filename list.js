
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

    if (this.id === idNum){
        //runner.next = runner.next.next; this is the mutible version.... must be a copy
        //console.log('find=>',this.value);
        return this;

    } else {
        if (this.next===null){
            return null;
        }
        else {
            return this.next.find(idNum);
        }
    }
}

ListNode.prototype.insertAt = function(id,list){
    if (this.id ===id){
        return this.append(list);
    } else {
        return new ListNode(this.value, this.next? this.next.insertAt(id,list): null);
    }
}

ListNode.prototype.intersection = function(list){
    const found = list.find(this.id);

    if (found) return found;
    else return (this.next!=null) ? this.next.intersection(list) : null;
}




module.exports = { ListNode };
// Yow! Even more destructured assignment
// This is the same as: module.exports = { ListNode: ListNode };

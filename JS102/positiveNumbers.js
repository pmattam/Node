var positiveNumbers = function(numList) {
    var newNumList = [];
    for (i = 0; i < numList.length; i++) {
        if (numList[i] >= 0) {
            newNumList.push(numList[i]);
        }
    }
    return newNumList;
};

module.exports = positiveNumbers;
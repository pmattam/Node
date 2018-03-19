var ticTacToe = function(tacList) {
    var tacStr = "";
    for (i = 0; i < tacList.length; i++) {
        for (j = 0; j < tacList[i].length; j++) {
            if (tacList[i][j] === null) {
                tacList[i][j] = 'Y';
            }
        }
        tacStr += tacList[i].join('');
    }
    if (tacStr.charAt(0) === tacStr.charAt(3) && tacStr.charAt(3) === tacStr.charAt(6)) {
        if (tacStr.charAt(0) !== 'Y') {
            return tacStr.charAt(0);
        }
    }
    if (tacStr.charAt(1) === tacStr.charAt(4) && tacStr.charAt(4) === tacStr.charAt(7)) {
        if (tacStr.charAt(1) !== 'Y') {
            return tacStr.charAt(1);
        }
    }
    if (tacStr.charAt(2) === tacStr.charAt(5) && tacStr.charAt(5) === tacStr.charAt(8)) {
        if (tacStr.charAt(2) !== 'Y') {
            return tacStr.charAt(2);
        }
    }
    if (tacStr.slice(0, 3) === 'OOO' || tacStr.slice(3, 6) === 'OOO' || tacStr.slice(6, 9) === 'OOO') {
        return 'O';
    }
    if (tacStr.slice(0, 3) === 'XXX' || tacStr.slice(3, 6) === 'XXX' || tacStr.slice(6, 9) === 'XXX') {
        return 'X';
    }
    if (tacStr.charAt(0) === tacStr.charAt(4) && tacStr.charAt(4) === tacStr.charAt(8)) {
        if (tacStr.charAt(0) !== 'Y') {
            return tacStr.charAt(0);
        }
    }
    if (tacStr.charAt(2) === tacStr.charAt(4) && tacStr.charAt(4) === tacStr.charAt(6)) {
        if (tacStr.charAt(2) !== 'Y') {
            return tacStr.charAt(2);
        }
    }
    return null;
};

module.exports = ticTacToe;
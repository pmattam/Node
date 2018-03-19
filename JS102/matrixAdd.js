var matrixAdd = function(matrix1, matrix2) {
    var resultMatrix = [];
    for (i = 0; i < matrix1.length; i++) {
        var subList = [];
        for (j = 0; j < matrix1[i].length; j++) {
            subList.push(matrix1[i][j] + matrix2[i][j]);
        }
        resultMatrix.push(subList);
    }
    return resultMatrix;
};

module.exports = matrixAdd;
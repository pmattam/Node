var matrixMultiplication = function(matrix1, matrix2) {
    var resultMatrix = [];

    if (matrix1.length === matrix2[0].length && matrix1[0].length === matrix2.length) {
        for (i = 0; i < matrix1.length; i++) {
            var subList = [];
            for (j = 0; j < matrix2[0].length; j++) {
                var cell = 0;
                for (k = 0; k < matrix2.length; k++) {
                    cell += matrix1[i][k] * matrix2[k][j];
                }
                subList.push(cell);
            }
            resultMatrix.push(subList);
        }
        return resultMatrix;
    } else {
        return "Matrices length don't match for Matrix Multiplicaton - Expected m x n and n x m matrices"
    }
};

module.exports = matrixMultiplication;
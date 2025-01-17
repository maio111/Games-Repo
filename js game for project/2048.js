var board;
var rows =4;
var columns=4;
var score =0;

window.onload= function()
{
    setGame();
}
function setGame()
{
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 4],
    //     [8,8 , 8, 8],
    //     [8, 8, 8,8 ]
    // ]


    for(var r=0; r<rows ;r++)
    {
        for(var c=0;c<columns;c++)
        {
            //<div id="0-0"></div>
            var tile=document.createElement("div")
            tile.id=r.toString()+ "-" +c.toString();
            var num =board[r][c];
            updateTile(tile,num);
            document.getElementById("board").append(tile)
        }
    }
    setTwo();
    setTwo();
}
function updateTile(tile,num)
{
    tile.innerText="";
    tile.classList.value="";//عشان نمنع ان يكون ليه اكتر من كلاس X 
    tile.classList.add("tile")
    if(num>0)
    {
        tile.innerText = num.toString();
        if(num<=4096) // علشان كل اللي قبل الرقم دا ليهم نفس الاستايل
        {
            tile.classList.add("x"+num.toString());
        }
        else
        {
            tile.classList.add("x8192");
        }
    }

}
document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") {
        slideLeft();
        setTwo();
    } else if (e.code === "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code=== "ArrowUp")
    {
        sildeup();
        setTwo();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    
    }
    document.getElementById("score").innerHTML=score;
});

function hasEmptyTile()
{
    for(let r =0; r<rows;r++)
    {
        for(let c=0;c<columns;c++)
        {
            if(board[r][c]==0)
            {
                return true;
            }
        }
    }
    return false;
}

function setTwo()
{
    // full tile
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    if (board[r][c] == 0) {
        board[r][c] = 2;
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        tile.innerText = "2";
        tile.classList.add("x2");
        found = true;
    }
}
}
function filterZero(row)
{
    //[0,2,2,2]
    return row.filter(num=>num!=0); //هتعمل فلتر للاراي من زيروز
}

function slide(row) {
    row = filterZero(row);
    for (var i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i]; 
        }
    }
    row = filterZero(row);
    while (row.length < columns) {
        row.push(0);
        //هنحط باقي الاراي بأصفار
    }
    return row;
}
function slideLeft() {
    for (var r = 0; r < rows; r++) {
        var row = board[r];
        board[r] = slide(row);
        for (var c = 0; c < columns; c++) {
            var tile = document.getElementById(r.toString() + "-" + c.toString());
            var num = board[r][c];
            updateTile(tile, num);
        }
    }
}
function slideRight() {
    for (var r = 0; r < rows; r++) {
        var row = board[r];
        row.reverse(); // Reverse the row temporarily
        row = slide(row);
        row.reverse(); // Reverse it back to the original order
        board[r] = row;

        for (var c = 0; c < columns; c++) {
            var tile = document.getElementById(r.toString() + "-" + c.toString());
            var num = board[r][c];
            updateTile(tile, num);
        }
    }
}
function sildeup() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for (var r = 0; r < rows; r++) {
            board[r][c]=row[r];
            var tile = document.getElementById(r.toString() + "-" + c.toString());
            var num = board[r][c];
            updateTile(tile, num);
        }
    }
}
function  slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for (var r = 0; r < rows; r++) {
            board[r][c] = row[r];

            var tile = document.getElementById(r.toString() + "-" + c.toString());
            var num = board[r][c];
            updateTile(tile, num);
        }
    }
}

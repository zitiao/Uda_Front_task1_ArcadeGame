// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.offset = 60;   // 偏移图片Y轴，使之处于格子正中央
    this.xRange = [-100,0]; // 随机的出现地点范围
    this.speedRange = [50,300]; // 随机的速度
    this.x = this.xRange[0] + Math.round(Math.random() * (0 - this.xRange[1]));
    this.y = Math.round(Math.random() * 2) * 83 + this.offset;  //随机的出现地点范围
    this.dis = this.speedRange[0] + Math.round(Math.random() * (this.speedRange[1] - 0));   //随机的移动步距

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.dis;

    // 如果超出了屏幕，先把该实例从敌人列表中去掉，再画一个新的
    if (this.x > 505) {
        let index = allEnemies.indexOf(this);
        allEnemies.splice(index,1);
        let enemy = new Enemy();
        allEnemies.push(enemy);
    }

};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(){
    // this.offset = 40;
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
    this.disY = 83; // x轴移动步距
    this.disX = 101;// y轴移动步距
    this.position = [2,5]; //当前所处格子
}

// 玩家是否成功抵达终点
Player.prototype.update = function(){
    if (this.position[1] == 0) {
        player = new Player();
    }
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// 根据键盘输入的指令，移动人物
Player.prototype.handleInput = function(direction){
    switch (direction)
    {
        case 'left':
            if (this.position[0] > 0) {
                this.x -= this.disX;this.position[0]--;
            }
            break;
        case 'right':
            if (this.position[0] < 4) {
               this.x += this.disX;this.position[0]++; 
            }
            break;
        case 'up':
            if (this.position[1] > 0) {
                this.y -= this.disY;this.position[1]--;
            }
            break;
        case 'down':
            if (this.position[1] < 5) {
                this.y += this.disY;this.position[1]++;
            }
            break;
    }
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
let allEnemies = [],
    player = new Player();

for(let i=1;i<8;i++){
    let enemy = new Enemy();
    allEnemies.push(enemy);    
}


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

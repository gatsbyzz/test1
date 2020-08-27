function Circle(x, y, radius) {
	this.x = x
	this.y = y
	this.radius = radius
}
function Line(startPoint, endPoint, thickness) {
	this.startPoint = startPoint
	this.endPoint = endPoint
	this.thickness = thickness
}
var untangleGame = {
	circleRadius: 10,
	circles: [],
	lines: [],
	thinLineThickness: 1,
	boldLineThickness: 5,
	currentLevel: 0,
	progressPercentage: 0
}
untangleGame.levels = [
	{
		level: 0,
		circles: [
			{x: 400, y: 156},
			{"x" : 381, "y" : 241},
			{"x" : 84, "y" : 233},
			{"x" : 88, "y" : 73}
		],
		relationship: {
			"0" : {"connectedPoints" : [1,2]},
			"1" : {"connectedPoints" : [0,3]},
			"2" : {"connectedPoints" : [0,3]},
			"3" : {"connectedPoints" : [1,2]}
		}
	},
	{
		level : 1,
		circles : [{"x" : 401, "y" : 73},
					{"x" : 400, "y" : 240},
					{"x" : 88, "y" : 241},
					{"x" : 84, "y" : 72}],
		relationship : {
							"0" : {"connectedPoints" : [1,2,3]},
							"1" : {"connectedPoints" : [0,2,3]},
							"2" : {"connectedPoints" : [0,1,3]},
							"3" : {"connectedPoints" : [0,1,2]}
						  }				  
	},
	{
		"level" : 2,
		"circles" : [{"x" : 92, "y" : 85},
					{"x" : 253, "y" : 13},
					{"x" : 393, "y" : 86},
					{"x" : 390, "y" : 214},
					{"x" : 248, "y" : 275},
					{"x" : 95, "y" : 216}],
		"relationship" : {
							"0" : {"connectedPoints" : [2,3,4]},
							"1" : {"connectedPoints" : [3,5]},
							"2" : {"connectedPoints" : [0,4,5]},
							"3" : {"connectedPoints" : [0,1,5]},
							"4" : {"connectedPoints" : [0,2]},
							"5" : {"connectedPoints" : [1,2,3]}
						  }				  
	},
	{
		"level" : 3,
		"circles" : [{"x" : 92, "y" : 85},
					{"x" : 253, "y" : 13},
					{"x" : 393, "y" : 86},
					{"x" : 390, "y" : 214},
					{"x" : 248, "y" : 275},
					{"x" : 95, "y" : 216}],
		"relationship" : {
							"0" : {"connectedPoints" : [1,3,4]},
							"1" : {"connectedPoints" : [2,5,1]},
							"2" : {"connectedPoints" : [0,3,5]},
							"3" : {"connectedPoints" : [1,2,5]},
							"4" : {"connectedPoints" : [0,5,4]},
							"5" : {"connectedPoints" : [1,4,3]}
						  }				  
	},
	{
		"level" : 4,
		"circles" : [{"x" : 92, "y" : 85},
					{"x" : 253, "y" : 13},
					{"x" : 393, "y" : 86},
					{"x" : 390, "y" : 214},
					{"x" : 248, "y" : 275},
					{"x" : 228, "y" : 245},
					{"x" : 95, "y" : 216}],
		"relationship" : {
							"0" : {"connectedPoints" : [1,3,4]},
							"1" : {"connectedPoints" : [2,5,1]},
							"2" : {"connectedPoints" : [0,6,5]},
							"3" : {"connectedPoints" : [1,2,6]},
							"4" : {"connectedPoints" : [0,5,4]},
							"5" : {"connectedPoints" : [1,4,3]},
							"6" : {"connectedPoints" : [1,6,2]}
						  }				  
	}
]
function drawLine(ctx, x1, y1, x2, y2, thickness) {
	ctx.beginPath()
	ctx.moveTo(x1, y1)
	ctx.lineTo(x2, y2)
	ctx.lineWidth = thickness
	ctx.strokeStyle = '#cfc'
	ctx.stroke()
}
function drawCircle(ctx, x, y, radius) {
	var circle_gradient = ctx.createRadialGradient(x+3, y+3,1, x, y, untangleGame.circleRadius)
	circle_gradient.addColorStop(0, '#fff')
	circle_gradient.addColorStop(1, '#cc0')
	ctx.fillStyle = circle_gradient
	// ctx.fillStyle = 'rgb(200, 200, 100, .6)'
	ctx.beginPath()
	ctx.arc(x, y, radius, 0, Math.PI*2)
	ctx.closePath()
	ctx.fill()
}
function connectCircles() {
	// untangleGame.lines.length = 0
	// for( var i = 0; i < untangleGame.circles.length; i++) {
	// 	var startPoint = untangleGame.circles[i]
	// 	for(var j = 0; j < untangleGame.circles.length; j++) {
	// 		var endPoint = untangleGame.circles[j]
	// 		// drawLine(ctx, startPoint.x, startPoint.y, endPoint.x, endPoint.y, untangleGame.thinLineThickness)
	// 		untangleGame.lines.push(new Line(startPoint, endPoint, untangleGame.thinLineThickness))
	// 	}
	// }
	// 根据关卡数据设置所有的连接线
	var level = untangleGame.levels[untangleGame.currentLevel]
	untangleGame.lines.length = 0
	for (var i in level.relationship) {
		var connectedPoints = level.relationship[i].connectedPoints
		var startPoint = untangleGame.circles[i]
		for( var j in connectedPoints) {
			var endPoint = untangleGame.circles[connectedPoints[j]]
			untangleGame.lines.push(new Line(startPoint, endPoint))
		}
	}
}

$(function() {
	var canvas = document.getElementById('game')
	var ctx = canvas.getContext('2d')
	var width = canvas.width
	var height = canvas.height
	var circleRadius = 10
	var circleCount = 5
	// 随机生成5个圆
	// for ( var i = 0; i < circleCount; i++) {
	// 	var x = Math.random() * width
	// 	var y = Math.random() * height
	// 	drawCircle(ctx, x, y, circleRadius)
	// 	untangleGame.circles.push(new Circle(x, y, circleRadius))
	// }
	setupCurrentLevel()
	updateLevelProgress();
	// connectCircles()
	// 为鼠标添加 事件监听器
	$('#game').mousedown(function(e) {
		var canvasPosition = $(this).offset()
		// capture mouse
		var mouseX = (e.pageX - canvasPosition.left) || 0
		var mouseY = (e.pageY - canvasPosition.top) || 0
		// capture circle
		for (var i = 0; i < untangleGame.circles.length; i++) {
			var circleX = untangleGame.circles[i].x
			var circleY = untangleGame.circles[i].y
			var circleRadius = untangleGame.circles[i].radius
			
			// 判断半径
			if (Math.pow(mouseX - circleX, 2) + Math.pow(mouseY - circleY, 2) < Math.pow(circleRadius, 2)) {
				untangleGame.targetCircle = i
				break
			}
		}
	})
	// 鼠标移动
	$('#game').mousemove(function(e) {
		if (untangleGame.targetCircle !== undefined) {
			var canvasPosition = $(this).offset()
			// capture mouse
			var mouseX = (e.pageX - canvasPosition.left) || 0
			var mouseY = (e.pageY - canvasPosition.top) || 0
			var radius = untangleGame.circles[untangleGame.targetCircle].radius
			untangleGame.circles[untangleGame.targetCircle] = new Circle(mouseX, mouseY, radius)
		}
		connectCircles()
		updateLineIntersection()
		updateLevelProgress()
	})
	
	$('#game').mouseup(function(e) {
		untangleGame.targetCircle = undefined
		checkLevelCompleteness()
	})
	setInterval(gameloop, 30)
})
function gameloop() {
	var canvas = document.getElementById('game')
	var ctx = canvas.getContext('2d')
	clear(ctx)
	var bg_gradient = ctx.createLinearGradient(0,0,0,ctx.canvas.height)
	bg_gradient.addColorStop(0, '#000000')
	bg_gradient.addColorStop(0, '#555555')
	ctx.fillStyle = bg_gradient
	ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height)
	// 绘制文本
	ctx.font = '26px Arial'
	ctx.textAlign = 'center'
	ctx.fillStyle = '#fffaaa'
	ctx.fillText('Untangle Game', ctx.canvas.width/2, 50)
	
	// 连线
	// console.log(untangleGame.lines)
	for (var i = 0; i < untangleGame.lines.length; i++) {
		var line = untangleGame.lines[i]
		var startPoint = line.startPoint
		var endPoint = line.endPoint
		var thickness = line.thickness
		drawLine(ctx, startPoint.x, startPoint.y, endPoint.x, endPoint.y, thickness)
	}
	// 画圆
	for (var i = 0; i < untangleGame.circles.length; i++) {
		var circle = untangleGame.circles[i]
		drawCircle(ctx, circle.x, circle.y, circle.radius)
	}
}
function clear(ctx) {
	var canvas = document.getElementById('game')
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}
function updateLineIntersection()
{
	// check lines intersection
	for (var i=0;i<untangleGame.lines.length;i++) {
		var line1 = untangleGame.lines[i];
		line1.thickness = untangleGame.thinLineThickness;
		for(var j=0;j<i;j++) {	
			var line2 = untangleGame.lines[j];
			// we check if two lines are interseted, 
			// and bold the line if they are.
			if (isIntersect(line1, line2)) {
				line1.thickness = untangleGame.boldLineThickness;
				line2.thickness = untangleGame.boldLineThickness;
			}			
		}
	}
}
// 检测相交线
function isIntersect(line1, line2)
{
	// convert line1 to general form of line: Ax+By = C
	var a1 = line1.endPoint.y - line1.startPoint.y;
	var b1 = line1.startPoint.x - line1.endPoint.x;
	var c1 = a1 * line1.startPoint.x + b1 * line1.startPoint.y;
	
	// convert line2 to general form of line: Ax+By = C
	var a2 = line2.endPoint.y - line2.startPoint.y;
	var b2 = line2.startPoint.x - line2.endPoint.x;
	var c2 = a2 * line2.startPoint.x + b2 * line2.startPoint.y;
	
	// calculate the intersection point		
	var d = a1*b2 - a2*b1;
	
	// parallel when d is 0
	if (d == 0) {
		return false;
	} else {
		var x = (b2*c1 - b1*c2) / d;
		var y = (a1*c2 - a2*c1) / d;
					
		// check if the interception point is on both line segments
		if ((isInBetween(line1.startPoint.x, x, line1.endPoint.x) || isInBetween(line1.startPoint.y, y, line1.endPoint.y)) &&
			(isInBetween(line2.startPoint.x, x, line2.endPoint.x) || isInBetween(line2.startPoint.y, y, line2.endPoint.y))) 
		{
			return true;	
		}
	}
	
	return false;
}
// return true if b is between a and c,
// we exclude the result when a==b or b==c
function isInBetween(a, b, c) {
	// return false if b is almost equal to a or c.
	// this is to elmiate some floating point when
	// two value is equal to each other but different with 0.00000...0001
	if (Math.abs(a-b) < 0.000001 || Math.abs(b-c) < 0.000001) {
		return false;
	}
	
	// true when b is in between a and c
	return (a < b && b < c) || (c < b && b < a);
}
function setupCurrentLevel() {
	untangleGame.circles = []
	var level = untangleGame.levels[untangleGame.currentLevel]
	// console.log(untangleGame.currentLevel, untangleGame.levels)
	for (var i = 0; i < level.circles.length; i++) {
		untangleGame.circles.push(new Circle(level.circles[i].x, level.circles[i].y, 10))
	}
	// 设置连线数据
	connectCircles()
	updateLineIntersection()
}
function checkLevelCompleteness() {
	if ($('#progress').html() === "100") {
		if (untangleGame.currentLevel + 1 < untangleGame.levels.length) {
			untangleGame.currentLevel++
		}
		console.log(untangleGame.currentLevel, untangleGame.levels.length)
		setupCurrentLevel()
	}
}
function updateLevelProgress() {
	var progress = 0
	for (var i = 0; i < untangleGame.lines.length; i++) {
		if (untangleGame.lines[i].thickness === untangleGame.thinLineThickness) {
			progress++
		}
	}
	var progressPercentage = Math.floor(progress / untangleGame.lines.length * 100)
	$('#progress').html(progressPercentage)
	$('#level').html(untangleGame.currentLevel + 1)
}
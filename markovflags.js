/*
// Aspect ratio of the rectangular bounding box. Frequencies taken from
// https://en.wikipedia.org/wiki/National_flags_proportions_by_country
// length = width * ratio
RECTANGLE_ASPECT_RATIOS = {
    0.820: 1,     // Nepal
    1: 2,         // Switzerland and Vatican City (1:1)
    1.154: 1,     // Belgium
    1.167: 1,     // Niger
    1.25: 1,      // Monaco
    1.321: 1,     // Denmark
    1.333: 4,     // San Marino
    1.375: 3,     // Norway
    1.389: 1,     // Iceland
    1.4: 2,       // Albania
    1.429: 2,     // Brazil
    1.467: 1,     // Bolivia
    1.5: 102,     // Very popular (2:3)
    1.6: 5,       // Argentina
    1.618: 1,     // Togo
    1.636: 1,     // Finland
    1.667: 17,    // Third most popular (3:5)
    1.748: 1,     // Iran
    1.75: 1,      // Mexico
    1.772: 1,     // El Salvador
    1.818: 1,     // Paraguay
    1.864: 1,     // Guam
    1.895: 1,     // Vanuatu
    1.9: 4,       // USA! USA!
    2: 82,        // Another popular choice (1:2)
    2.545: 1      // Qatar
}
// turn the frequencies into probabilities
var rect_aspect_sum = 0;
for (var k in RECTANGLE_ASPECT_RATIOS) { rect_aspect_sum += RECTANGLE_ASPECT_RATIOS[k]; }
for (var k in RECTANGLE_ASPECT_RATIOS) { RECTANGLE_ASPECT_RATIOS[k] /= rect_aspect_sum; }


COLORS = {
    'yellow': '#F9DD16',
    'black': '#000000',
    'white': '#FFFFFF',
    'purple', '#800080',
    'orange', '#FFA500',
    'blue': '#003399',
    'grey': '#808080',
    'red': '#D21034',
    'brown': '#A52A2A',
    'green', '#008000',
}

COLOR_COMBOS {
    'yellow': 1,
    'black,yellow,': 2,
    'white,yellow': 1,
    'purple,white':, 2,
    'purple,white,yellow': 2,
    'purple,yellow': 1,
    'orange,white': 1,
    'orange,white,yellow': 1,
    'blue': 3,
    'blue,white': 31,
    'blue,orange,white': 1,
    'black,blue,white': 2,
    'blue,yellow': 9,
    'blue,white,yellow': 7,
    'black,blue,yellow': 2,
    'black,blue,yellow,white': 2,
    'blue,grey,yellow': 1
    'blue,grey,yellow,white': 1,
    'blue,red': 2
    'blue,red,white': 51,
    'black,blue,red,white': 1,
    'blue,orange,red,white': 1,
    'blue,orange,red': 1,
    'blue,red,yellow': 10,
    'black,blue,red,yellow': 2,
    'blue,brown,green,red,yellow': 1,
    'blue,red,white,yellow': 12,
    'black,blue,red,white,yellow': 4,
    'black,red': 2,
    'red,white': 33,
    'black,red,white': 7,
    'green,red,white': 17,
    'red,yellow': 9,
    'black,red,yellow': 5,
    'black,red,yellow': 5,
    'red,white,yellow': 5,
    'black,red,white,yellow': 8,
    'black,grey,red,white,yellow': 1,
    'red,green': 4,
    'black,green,red': 1,
    'black,green,orange,red': 1,
    'black,green,red,white': 12,
    'green,red,yellow': 10,
    'black,green,red,yellow': 4,
    'green,orange,red,yellow': 1,
    'green,red,white,yellow', 6,
    'black,green,red,white,yellow': 4,
    'black,brown,green,purple,white,yellow': 1
    'green' 1:,
    'green,white': 9,
    'green,orange,white': 3,
    'green,yellow': 2,
    'black,green,yellow': 3,
    'brown,green,yellow': 1,
    'green,white,yellow': 2,
    'black,white': 3,
    'blue,green,white': 2,
    'black,blue,green,white': 1,
    'blue,green,orange,white': 1,
    'blue,green,yellow': 3,
    'black,blue,green,yellow': 1,
    'blue,green,white,yellow': 3,
    'blue,green,red,white': 7,
    'blue,green,red,yellow': 4,
    'blue,green,red,yellow': 4,
    'black,blue,brown,green,red,yellow': 1,
    'blue,green,red,white,yellow': 5,
    'black,blue,green,red,white,yellow': 7
}:

POINTS = [0, 1, 2, 3]

/*
Markov Chain For Flags:
1) Pick a shape: rectangle, swallowtail, sawtooth
2a) Pick an overall aspect ratio.
2b) For swallowtail and sawtooth, pick number of points
2c) For swallowtail and sawtooth, pick point aspect ratio for points
3a) Pick general motif field, veritcal bars, horizontal bars, diagonal,
     2x2 grid
3b) Pick width of elements
4) Pick canton, wedge, or none
5a) Pick charge of star, constelation, sun, cresent and star
5b) For star, pick number of points
5c) For star, pick number of stars and pattern
6a) Identify elements and color, with at least the minimum coloring pattern
6b) Pick a color
6b) Pick another color based on the previous colors picked
*/

/*
Maybe we need basic patterns:
    solid
    2,3,4,5 even vertical bars
    2,3,4,5 even horizontal bars
    thin,thick,thin vertical
    thin,thick,thin horizontal
    2,3,4,5 golden ratio vertical bars
    2,3,4,5 golden ratio horizontal bars
    ltr, ltr-with-border, rtl, rtl-with-border diagonals
    2x2 grid
    border
*/

function renderFlag(ele, flagConfig) {
    // make clip path
    var outsidePoints = clipFlagOutline(ele, flagConfig);

    drawStripes(ele, flagConfig);
    drawCanton(ele, flagConfig);

    // draw outline
    drawPolygon(ele, outsidePoints, "1", "black", null);
}

function getBoundingBox(canvasEle, flagConfig) {
    var height = canvasEle.height * flagConfig.dimensions.heightRatio;
    var width = height * flagConfig.dimensions.aspectRatio;
    var originX = (canvasEle.width - width) / 2.0;
    var originY = (canvasEle.height - height) / 2.0;
    return [originX, originY, width, height];
}

function clipFlagOutline(ele, flagConfig) {
    var ret = getBoundingBox(ele, flagConfig);
    var originX = ret[0];
    var originY = ret[1];
    var width = ret[2];
    var height = ret[3];

    var swallowStart = (height * flagConfig.swallowtails.start);
    var swallowLength = width - swallowStart;
    var insideX = originX + swallowStart;

    // clockwise
    var points = [
        [ originX, originY ],
        [ originX + swallowStart, originY ]
    ];
    var curX = originX + swallowStart;
    var curY = originY;
    for (var i = 0; i < flagConfig.swallowtails.points.length; i++) {
        var curControl = flagConfig.swallowtails.controls[i];
        if (curControl == "c") {
            // center point
            if (curX > insideX) {
                // move home
                curX -= swallowLength;
                points.push([curX, curY]);
            }

            var lastEdge = 0;
            if (i > 0) {
                lastEdge = flagConfig.swallowtails.points[i - 1]
            }
            var midDelta = ((parseFloat(flagConfig.swallowtails.points[i]) * height) - (lastEdge * height)) / 2;
            curX += swallowLength;
            curY += midDelta;
            points.push([curX, curY]);

            curX -= swallowLength;
            curY += midDelta;
            points.push([curX, curY]);
        } else if (curControl == 'i') {
            // inside straight
            if (curX > insideX) {
                // move home
                curX -= swallowLength;
                points.push([curX, curY]);
            }

            curY = (parseFloat(flagConfig.swallowtails.points[i]) * height) + originY;
            points.push([curX, curY]);
        } else if (curControl == 'o') {
            // outside straight
            if (curX == insideX) {
                // move out
                curX += swallowLength;
                points.push([curX, curY]);
            }

            curY = (parseFloat(flagConfig.swallowtails.points[i]) * height) + originY;
            points.push([curX, curY]);
        } else if (curControl == 't') {
            // top point
            if (curX == insideX) {
                // move out
                curX += swallowLength;
                points.push([curX, curY]);
            }

            curX = insideX;
            curY = (parseFloat(flagConfig.swallowtails.points[i]) * height) + originY;
            points.push([curX, curY]);
        } else if (curControl == 'b') {
            // bottom point
            if (curX > insideX) {
                // move home
                curX -= swallowLength;
                points.push([curX, curY]);
            }

            curX += swallowLength;
            curY = (parseFloat(flagConfig.swallowtails.points[i]) * height) + originY;
            points.push([curX, curY]);
        }
    }
    points.push([originX + swallowStart, originY + height]);
    points.push([originX, originY + height]);

    drawPolygon(ele, points, "1", "black", null, true);
    return points;
}

function drawStripes(ele, flagConfig) {
    if (flagConfig.stripes.orient == "vert") {
        drawVerticalStripes(ele, flagConfig);
    } else if (flagConfig.stripes.orient == "diag") {
        drawDiagonalStripes(ele, flagConfig);
    } else {
        drawHorizontalStripes(ele, flagConfig);
    }
}

function drawVerticalStripes(ele, flagConfig) {
    var ret = getBoundingBox(ele, flagConfig);
    var originX = ret[0];
    var originY = ret[1];
    var width = ret[2];
    var height = ret[3];
    var stripes = [];

    var stripeStartX = originX;
    var stripeStartY = originY;
    for (var i = 0; i < flagConfig.stripes.points.length; i++) {
        var left = 0;
        if (i > 0) {
            left = width * parseFloat(flagConfig.stripes.points[i - 1]);
        }
        var stripeWidth = (width * parseFloat(flagConfig.stripes.points[i])) - left;
        var points = [
            [ stripeStartX, stripeStartY ],
            [ stripeStartX + stripeWidth, stripeStartY ],
            [ stripeStartX + stripeWidth, stripeStartY + height ],
            [ stripeStartX, stripeStartY + height ]
        ];
        stripes.push(points);
        drawPolygon(ele, points, "1", flagConfig.stripes.colors[i], flagConfig.stripes.colors[i]);
        stripeStartX = stripeStartX + stripeWidth;
    }

    return stripes;
}

function drawHorizontalStripes(ele, flagConfig) {
    var ret = getBoundingBox(ele, flagConfig);
    var originX = ret[0];
    var originY = ret[1];
    var width = ret[2];
    var height = ret[3];

    var stripes = [];

    var stripeStartX = originX;
    var stripeStartY = originY;
    for (var i = 0; i < flagConfig.stripes.points.length; i++) {
        var top = 0;
        if (i > 0) {
            top = height * parseFloat(flagConfig.stripes.points[i - 1]);
        }
        var stripeWidth = (height * parseFloat(flagConfig.stripes.points[i])) - top;
        var points = [
            [ stripeStartX, stripeStartY ],
            [ stripeStartX + width, stripeStartY ],
            [ stripeStartX + width, stripeStartY + stripeWidth ],
            [ stripeStartX, stripeStartY + stripeWidth ]
        ];
        stripes.push(points);
        drawPolygon(ele, points, "1", flagConfig.stripes.colors[i], flagConfig.stripes.colors[i]);
        stripeStartY = stripeStartY + stripeWidth;
    }

    return stripes;
}

function drawDiagonalStripes(ele, flagConfig) {
    var ret = getBoundingBox(ele, flagConfig);
    var originX = ret[0];
    var originY = ret[1];
    var width = ret[2];
    var height = ret[3];
    var pointSlope = height / (width * 1.0);
    var lineSlope = -pointSlope;

    stripes = [];
    for (var i = 0; i < flagConfig.stripes.points.length; i++) {
        var midX = (originX + width) - (flagConfig.stripes.points[i] * width);
        var midY = originY + (flagConfig.stripes.points[i] * height);


        // solve for when startY = originY
        var tX = ((midX - originX) / width);
        var tY = ((midY - originY) / height);

        var startX = originX;
        var endX   = originX + width;

        var startY = originY;
        var endY   = originY + height;

        if (tY > tX) {
            startY = midY - (midX - startX) * pointSlope;
            endX   = midX + (midY - startY) / pointSlope;
        } else {
            startX = midX - (midY - startY) / pointSlope;
            endY   = midY + (midX - startX) * pointSlope;
        }

        points = [[ startX, startY ]];
        if (i == 0) {
            points.push([originX + width, originY]);
        } else {
            var prevLeft = stripes[i - 1][0];
            var prevRight = stripes[i - 1][stripes[i - 1].length - 1];

            if ((startY != originY) && (prevLeft[1] == originY)) {
                points.push([originX, originY]);
            }
            points.push(prevLeft);
            points.push(prevRight);
            if ((startY != originY) && (prevLeft[1] == originY)) {
                points.push([originX + width, originY + height]);
            }
        }
        points.push([endX, endY]);

        drawPolygon(ele, points, "1", flagConfig.stripes.colors[i], flagConfig.stripes.colors[i]);
        stripes.push(points);
    }

    return stripes;
}

function drawCanton(ele, flagConfig) {
    if (flagConfig.canton.mode == "none") {
        return [];
    }

    var ret = getBoundingBox(ele, flagConfig);
    var originX = ret[0];
    var originY = ret[1];
    var width = ret[2];
    var height = ret[3];

    var points = [];

    if (flagConfig.canton.mode == "equi triangle") {
        points = [
            [originX, originY],
            [originX + (height / 2.0  * Math.sqrt(3)), originY + (height / 2.0)],
            [originX, originY + height],
        ];

    } else if (flagConfig.canton.mode == "iso triangle") {
        points = [
            [originX, originY],
            [originX + width, originY + (height / 2.0)],
            [originX, originY + height],
        ];
    } else {
        var cantonHeight = height / 2.0;
        var cantonWidth = width / 2.0;
        if (flagConfig.canton.mode == "square") {
            cantonWidth = height / 2.0;
        } else if (flagConfig.canton.mode == "bar") {
            cantonWidth = height / 2.0;
            cantonHeight = height;
        }
        points = [
            [ originX, originY ],
            [ originX + cantonWidth, originY ],
            [ originX + cantonWidth, originY + cantonHeight ],
            [ originX, originY + cantonHeight ],
        ]
    }

    drawPolygon(ele, points, "0", flagConfig.canton.color, flagConfig.canton.color);

    return points;
}

function drawPolygon(ele, points, lineWidth, lineColor, fillColor, clip=false) {
    var ctx =  ele.getContext("2d")
    ctx.beginPath();
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    if (fillColor !== null) {
        ctx.fillStyle = fillColor;
    }

    ctx.moveTo(points[0][0], points[0][1]);
    for (var i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.lineTo(points[0][0], points[0][1]);
    if (fillColor !== null) {
        ctx.fill();
    }
    if (clip) {
        ctx.clip();
    } else {
        ctx.stroke();
    }
}

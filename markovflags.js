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
*/



function choose(weightedVals) {
    var sum = 0.0;
    for (var k in weightedVals) {
        sum += weightedVals[k]
    }
    var r = Math.random();
    for (var k in weightedVals) {
        r -= weightedVals[k] / sum;
        if (r <= 0) {
            return k;
        }
    }
}

function makeRandomFlagConfig() {
    var SHAPE_MODEL = {
      "START": {
        "horizontal": 168,
        "diagonal": 49,
        "vertical": 59
      },
      "horizontal": {
        "[0.0769, 0.1538, 0.2308, 0.3077, 0.3846, 0.4615, 0.5385, 0.6154, 0.6923, 0.7692, 0.8462, 0.9231, 1.0]": 1,
        "[0.0909, 0.1818, 0.2727, 0.3636, 0.4545, 0.5454, 0.6363, 0.7272, 0.8181, 0.909, 1.0]": 2,
        "[0.1, 0.25, 0.75, 0.9, 1.0]": 3,
        "[0.1429, 0.2857, 0.4286, 0.5718, 0.8571, 1.0]": 4,
        "[0.1665, 0.8335, 1.0]": 7,
        "[0.1667, 0.3334, 0.5, 0.667, 0.833, 1.0]": 2,
        "[0.2, 0.4, 0.6, 0.8, 1.0]": 7,
        "[0.25, 0.5, 0.75, 1.0]": 4,
        "[0.25, 0.75, 1.0]": 2,
        "[0.25, 1.0]": 1,
        "[0.333, 0.667, 1.0]": 75,
        "[0.333, 1.0]": 1,
        "[0.5, 0.75, 1.0]": 5,
        "[0.5, 1.0]": 29,
        "[0.667, 1.0]": 2,
        "[0.75, 1.0]": 2,
        "[1.0]": 35
      },
      "vertical": {
        "[0.0769, 0.1538, 0.2308, 0.3077, 0.3846, 0.4615, 0.5385, 0.6154, 0.6923, 0.7692, 0.8462, 0.9231, 1.0]": 1,
        "[0.0909, 0.1818, 0.2727, 0.3636, 0.4545, 0.5454, 0.6363, 0.7272, 0.8181, 0.909, 1.0]": 1,
        "[0.1, 0.25, 0.75, 0.9, 1.0]": 1,
        "[0.1429, 0.2857, 0.4286, 0.5718, 0.8571, 1.0]": 1,
        "[0.1665, 0.8335, 1.0]": 1,
        "[0.1667, 0.3334, 0.5, 0.667, 0.833, 1.0]": 1,
        "[0.2, 0.4, 0.6, 0.8, 1.0]": 1,
        "[0.25, 0.5, 0.75, 1.0]": 1,
        "[0.25, 0.75, 1.0]": 3,
        "[0.25, 1.0]": 2,
        "[0.333, 0.667, 1.0]": 19,
        "[0.333, 1.0]": 3,
        "[0.5, 0.75, 1.0]": 1,
        "[0.5, 1.0]": 4,
        "[0.667, 1.0]": 1,
        "[0.75, 1.0]": 1,
        "[1.0]": 35
      },
      "diagonal": {
        "[0.0769, 0.1538, 0.2308, 0.3077, 0.3846, 0.4615, 0.5385, 0.6154, 0.6923, 0.7692, 0.8462, 0.9231, 1.0]": 1,
        "[0.0909, 0.1818, 0.2727, 0.3636, 0.4545, 0.5454, 0.6363, 0.7272, 0.8181, 0.909, 1.0]": 1,
        "[0.1, 0.25, 0.75, 0.9, 1.0]": 1,
        "[0.1429, 0.2857, 0.4286, 0.5718, 0.8571, 1.0]": 1,
        "[0.1665, 0.8335, 1.0]": 1,
        "[0.1667, 0.3334, 0.5, 0.667, 0.833, 1.0]": 1,
        "[0.2, 0.4, 0.6, 0.8, 1.0]": 1,
        "[0.25, 0.5, 0.75, 1.0]": 2,
        "[0.25, 0.75, 1.0]": 1,
        "[0.25, 1.0]": 1,
        "[0.333, 0.667, 1.0]": 11,
        "[0.333, 1.0]": 1,
        "[0.5, 0.75, 1.0]": 1,
        "[0.5, 1.0]": 5,
        "[0.667, 1.0]": 1,
        "[0.75, 1.0]": 1,
        "[1.0]": 35
      },
      "[0.0769, 0.1538, 0.2308, 0.3077, 0.3846, 0.4615, 0.5385, 0.6154, 0.6923, 0.7692, 0.8462, 0.9231, 1.0]": {
        "rectangle": 5,
        "bar": 1,
        "equi triangle": 1,
        "iso triangle": 1,
        "none": 1,
        "square": 1
      },
      "[0.0909, 0.1818, 0.2727, 0.3636, 0.4545, 0.5454, 0.6363, 0.7272, 0.8181, 0.909, 1.0]": {
        "square": 3,
        "bar": 1,
        "equi triangle": 1,
        "iso triangle": 1,
        "none": 1,
        "rectangle": 1
      },
      "[0.1, 0.25, 0.75, 0.9, 1.0]": {
        "none": 4,
        "bar": 1,
        "equi triangle": 1,
        "iso triangle": 1,
        "rectangle": 1,
        "square": 1
      },
      "[0.1429, 0.2857, 0.4286, 0.5718, 0.8571, 1.0]": {
        "square": 3,
        "equi triangle": 3,
        "rectangle": 3,
        "bar": 1,
        "iso triangle": 1,
        "none": 1
      },
      "[0.1665, 0.8335, 1.0]": {
        "none": 8,
        "bar": 1,
        "equi triangle": 1,
        "iso triangle": 1,
      },
      "[0.25, 0.5, 0.75, 1.0]": {
        "none": 4,
        "bar": 3,
        "iso triangle": 3,
        "equi triangle": 1,
        "rectangle": 1,
        "square": 1
      },
      "[0.1667, 0.3334, 0.5, 0.667, 0.833, 1.0]": {
        "none": 3,
        "bar": 1,
        "equi triangle": 1,
        "iso triangle": 1,
        "rectangle": 1,
        "square": 1
      },
      "[0.2, 0.4, 0.6, 0.8, 1.0]": {
        "none": 5,
        "square": 3,
        "equi triangle": 4,
        "bar": 1,
        "iso triangle": 1,
        "rectangle": 1
      },
      "[0.25, 0.75, 1.0]": {
        "none": 5,
        "bar": 1,
        "equi triangle": 1,
        "iso triangle": 1,
        "rectangle": 1,
        "square": 1
      },
      "[0.333, 0.667, 1.0]": {
        "none": 88,
        "bar": 8,
        "equi triangle": 11,
        "iso triangle": 3,
        "rectangle": 1,
        "square": 1
      },
      "[0.333, 1.0]": {
        "none": 4,
        "bar": 1,
        "equi triangle": 1,
        "iso triangle": 1,
        "rectangle": 1,
        "square": 1
      },
      "[0.5, 0.75, 1.0]": {
        "none": 6,
        "bar": 1,
        "equi triangle": 1,
        "iso triangle": 1,
        "rectangle": 1,
        "square": 1
      },
      "[0.5, 1.0]": {
        "none": 24,
        "square": 3,
        "bar": 5,
        "equi triangle": 10,
        "iso triangle": 3,
        "rectangle": 1
      },
      "[0.667, 1.0]": {
        "none": 3,
        "bar": 1,
        "equi triangle": 1,
        "iso triangle": 1,
        "rectangle": 1,
        "square": 1
      },
      "[0.75, 1.0]": {
        "none": 3,
        "bar": 1,
        "equi triangle": 1,
        "iso triangle": 1,
        "rectangle": 1,
        "square": 1
      },
      "[1.0]": {
        "none": 62,
        "equi triangle": 26,
        "rectangle": 8,
        "iso triangle": 11,
        "bar": 1,
        "square": 1
      }
    };

    var PATTERN_MODEL = {
        1: {
            "[0]": 1
        },
        2: {
            "[0, 1]": 1
        },
        3: {
            "[0, 1, 0]": 29,
            "[0, 1, 2]": 86
        },
        4: {
            "[0, 1, 0, 1]": 2,
            "[0, 1, 2, 3]": 3,
            "[0, 1, 2, 0]": 1
        },
        5: {
            "[0, 1, 0, 1, 0]": 3,
            "[0, 1, 2, 1, 0]": 2,
            "[0, 1, 2, 1, 2]": 1
        },
        6: {
            "[0, 1, 2, 0, 1, 2]": 2,
            "[0, 1, 2, 3, 2, 1]": 1
        },
        7: {
            "[0, 1, 0, 1, 0, 1, 0]": 2,
            "[0, 1, 2, 3, 2, 1, 0]": 1
        },
        11: {
            "[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]": 1
        },
        13: {
            "[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]": 1
        }
    };

    var COLOR_MODEL = [
        {
            "START": {
                "black": 15,
                "blue": 65,
                "brown": 1,
                "green": 54,
                "orange": 4,
                "purple": 1,
                "red": 104,
                "white": 27,
                "yellow": 14
            },
            "black": {
                "blue": 3,
                "brown": 1,
                "green": 8,
                "orange": 1,
                "purple": 1,
                "red": 9,
                "white": 7,
                "yellow": 7
            },
            "blue": {
                "black": 9,
                "brown": 1,
                "green": 6,
                "orange": 1,
                "purple": 1,
                "red": 28,
                "white": 25,
                "yellow": 22
            },
            "brown": {
                "black": 1,
                "blue": 2,
                "green": 1,
                "orange": 1,
                "purple": 1,
                "red": 1,
                "white": 1,
                "yellow": 1
            },
            "green": {
                "black": 6,
                "blue": 3,
                "brown": 1,
                "orange": 1,
                "purple": 1,
                "red": 15,
                "white": 23,
                "yellow": 16
            },
            "orange": {
                "black": 1,
                "blue": 1,
                "brown": 1,
                "green": 2,
                "purple": 1,
                "red": 1,
                "white": 4,
                "yellow": 1
            },
            "purple": {
                'black': 1,
                'blue': 1,
                'brown': 1,
                'green': 1,
                'orange': 1,
                'red': 1,
                'white': 1,
                'yellow': 1
            },
            "red": {
                "black": 16,
                "blue": 35,
                "brown": 1,
                "green": 17,
                "orange": 1,
                "purple": 1,
                "white": 59,
                "yellow": 16,
            },
            "white": {
                "black": 7,
                "blue": 24,
                "brown": 1,
                "green": 17,
                "orange": 2,
                "purple": 1,
                "red": 59,
                "white": 1,
                "yellow": 1
            },
            "yellow": {
                "black": 1,
                "blue": 8,
                "brown": 2,
                "green": 14,
                "orange": 2,
                "purple": 2,
                "red": 19,
                "white": 5,
            },
        },
        {
            "START": {
                "black": {
                    'blue': 1,
                    'brown': 1,
                    'green': 2,
                    'orange': 2,
                    'purple': 1,
                    'red': 5,
                    'white': 6,
                    'yellow': 4,
                },
                "blue": {
                    'black': 8,
                    'brown': 1,
                    'green': 3,
                    'orange': 1,
                    'purple': 1,
                    'red': 15,
                    'white': 16,
                    'yellow': 19,
                },
                "brown": {
                    'black': 1,
                    'blue': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "green": {
                    'black': 5,
                    'blue': 2,
                    'brown': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 7,
                    'white': 18,
                    'yellow': 14,
                },
                "orange": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 4,
                    'yellow': 1
                },
                "purple": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "red": {
                    'black': 12,
                    'blue': 18,
                    'brown': 1,
                    'green': 6,
                    'orange': 1,
                    'purple': 1,
                    'white': 31,
                    'yellow': 11,
                },
                "white": {
                    'black': 1,
                    'blue': 7,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 12,
                    'yellow': 1
                },
                "yellow": {
                    'black': 1,
                    'blue': 4,
                    'brown': 1,
                    'green': 3,
                    'orange': 2,
                    'purple': 1,
                    'red': 4,
                    'white': 5,
                },
            },
            "black": {
                "blue": {
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "brown": {
                    'blue': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "green": {
                    'blue': 1,
                    'brown': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "orange": {
                    'blue': 1,
                    'brown': 1,
                    'green': 2,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "purple": {
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "red": {
                    'blue': 1,
                    'brown': 1,
                    'green': 4,
                    'orange': 1,
                    'purple': 1,
                    'white': 1,
                    'yellow': 3,
                },
                "white": {
                    'blue': 1,
                    'brown': 1,
                    'green': 2,
                    'orange': 1,
                    'purple': 1,
                    'red': 5,
                    'yellow': 1
                },
                "yellow": {
                    'blue': 2,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 5,
                    'white': 1,
                },
            },
            "blue": {
                "black": {
                    'brown': 1,
                    'green': 3,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 3,
                    'yellow': 1
                },
                "brown": {
                    'black': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "green": {
                    'black': 1,
                    'brown': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 2,
                    'yellow': 1
                },
                "orange": {
                    'black': 1,
                    'brown': 1,
                    'green': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "purple": {
                    'black': 1,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "red": {
                    'black': 2,
                    'brown': 1,
                    'green': 6,
                    'orange': 1,
                    'purple': 1,
                    'white': 3,
                    'yellow': 1
                },
                "white": {
                    'black': 1,
                    'brown': 1,
                    'green': 4,
                    'orange': 1,
                    'purple': 1,
                    'red': 4,
                    'yellow': 1
                },
                "yellow": {
                    'black': 1,
                    'brown': 1,
                    'green': 6,
                    'orange': 1,
                    'purple': 1,
                    'red': 5,
                    'yellow': 1
                }
            },
            "brown": {
                "black": {
                    'blue': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "blue": {
                    'black': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "green": {
                    'black': 1,
                    'blue': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "orange": {
                    'black': 1,
                    'blue': 1,
                    'green': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "purple": {
                    'black': 1,
                    'blue': 1,
                    'green': 1,
                    'orange': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "red": {
                    'black': 1,
                    'blue': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'white': 1,
                    'yellow': 1
                },
                "white": {
                    'black': 1,
                    'blue': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'yellow': 1
                },
                "yellow": {
                    'black': 1,
                    'blue': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                }
            },
            "green": {
                "black": {
                    'blue': 2,
                    'brown': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 2,
                    'white': 1,
                    'yellow': 2,
                },
                "blue": {
                    'black': 1,
                    'brown': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 2,
                    'white': 1,
                    'yellow': 1
                },
                "brown": {
                    'black': 1,
                    'blue': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "orange": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "purple": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'orange': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "red": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'orange': 1,
                    'purple': 1,
                    'white': 1,
                    'yellow': 3,
                },
                "white": {
                    'black': 3,
                    'blue': 2,
                    'brown': 1,
                    'orange': 2,
                    'purple': 1,
                    'red': 8,
                    'yellow': 1
                },
                "yellow": {
                    'black': 1,
                    'blue': 2,
                    'brown': 2,
                    'orange': 1,
                    'purple': 1,
                    'red': 7,
                    'white': 1,
                }
            },
            "orange": {
                "black": {
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "blue": {
                    'black': 1,
                    'brown': 1,
                    'green': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "brown": {
                    'black': 1,
                    'blue': 1,
                    'green': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "green": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "purple": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                "red": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'purple': 1,
                    'white': 1,
                    'yellow': 1
                },
                "white": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 4,
                    'purple': 1,
                    'red': 1,
                    'yellow': 1
                },
                "yellow": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                }
            },
            "purple": {
                'black': {
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                'blue': {
                    'black': 1,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                'brown': {
                    'black': 1,
                    'blue': 1,
                    'green': 1,
                    'orange': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                'green': {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'orange': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                'orange': {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'red': 1,
                    'white': 1,
                    'yellow': 1
                },
                'red': {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'white': 1,
                    'yellow': 1
                },
                'white': {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'red': 1,
                    'yellow': 1
                },
                'yellow': {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'red': 1,
                    'white': 1,
                },
            },
            "red": {
                "black": {
                    'blue': 1,
                    'brown': 1,
                    'green': 3,
                    'orange': 1,
                    'purple': 1,
                    'white': 1,
                    'yellow': 2,
                },
                "blue": {
                    'black': 1,
                    'brown': 1,
                    'green': 3,
                    'orange': 1,
                    'purple': 1,
                    'white': 3,
                    'yellow': 5,
                },
                "brown": {
                    'black': 1,
                    'blue': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'white': 1,
                    'yellow': 1
                },
                "green": {
                    'black': 1,
                    'blue': 2,
                    'brown': 1,
                    'orange': 1,
                    'purple': 1,
                    'white': 2,
                    'yellow': 1
                },
                "orange": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'purple': 1,
                    'white': 1,
                    'yellow': 1
                },
                "purple": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'white': 1,
                    'yellow': 1
                },
                "white": {
                    'black': 4,
                    'blue': 5,
                    'brown': 1,
                    'green': 6,
                    'orange': 1,
                    'purple': 1,
                    'yellow': 1
                },
                "yellow": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 4,
                    'orange': 1,
                    'purple': 2,
                    'white': 1,
                }
            },
            "white": {
                "black": {
                    'blue': 1,
                    'brown': 1,
                    'green': 2,
                    'orange': 1,
                    'purple': 1,
                    'red': 2,
                    'yellow': 2,
                },
                "blue": {
                    'black': 1,
                    'brown': 1,
                    'green': 2,
                    'orange': 1,
                    'purple': 1,
                    'red': 6,
                    'yellow': 1
                },
                "brown": {
                    'black': 1,
                    'blue': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'yellow': 1
                },
                "green": {
                    'black': 2,
                    'blue': 1,
                    'brown': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 2,
                    'yellow': 2,
                },
                "orange": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'purple': 1,
                    'red': 1,
                    'yellow': 1
                },
                "purple": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'red': 1,
                    'yellow': 1
                },
                "red": {
                    'black': 2,
                    'blue': 12,
                    'brown': 1,
                    'green': 3,
                    'orange': 1,
                    'purple': 1,
                    'yellow': 2,
                },
                "yellow": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                }
            },
            "yellow": {
                "black": {
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                },
                "blue": {
                    'black': 2,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 4,
                    'white': 1,
                },
                "brown": {
                    'black': 1,
                    'blue': 2,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                },
                "green": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 5,
                    'white': 2,
                },
                "orange": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'purple': 1,
                    'red': 1,
                    'white': 1,
                },
                "purple": {
                    'black': 1,
                    'blue': 1,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'red': 1,
                    'white': 1,
                },
                "red": {
                    'black': 3,
                    'blue': 1,
                    'brown': 1,
                    'green': 2,
                    'orange': 1,
                    'purple': 1,
                    'white': 3,
                },
                "white": {
                    'black': 2,
                    'blue': 2,
                    'brown': 1,
                    'green': 1,
                    'orange': 1,
                    'purple': 1,
                    'red': 2,
                }
            }
        }
    ];

    var orientation = choose(SHAPE_MODEL["START"]);
    var stripesPointsKey = choose(SHAPE_MODEL[orientation]);
    var stripesPoints = eval(stripesPointsKey);
    var cantonMode = choose(SHAPE_MODEL[stripesPointsKey]);

    var colorPatternKey = choose(PATTERN_MODEL[stripesPoints.length]);
    var colorPattern = eval(colorPatternKey);

    // fixups
    if (orientation == "diagonal") {
        cantonMode = "none";
    }
    if ((orientation == "vertical") && (cantonMode == "bar")) {
        cantonMode = "none";
    }

    var colors = [];
    for (var i = 0; i < colorPattern.length; i++) {
        if (colorPattern[i] >= colors.length) {
            if (colorPattern[i] == 0) {
                colors.push(choose(COLOR_MODEL[0]["START"]));
            } else if (colorPattern[i] == 1) {
                colors.push(choose(COLOR_MODEL[0][colors[0]]));
            } else {
                var found = true;
                while (found) {
                    found = false;
                    var candidate = choose(COLOR_MODEL[1][colors[colors.length - 2]][colors[colors.length - 1]]);
                    for (var j = 0; j < colors.length; j++) {
                        if (colors[j] == candidate) {
                            found = true;
                            break
                        }
                    }
                    if (!found) {
                        colors.push(candidate);
                    }
                }
            }
        }
    }

    var cantonColor = "none";
    if (cantonMode != "none") {
        var found = true;
        while (found) {
            found = false;
            if (colors.length < 3) {
                cantonColor = choose(COLOR_MODEL[0][colors[colors.length - 1]])
            } else {
                cantonColor = choose(COLOR_MODEL[1][colors[colors.length - 2]][colors[colors.length - 1]]);
            }
            for (var j = 0; j < colors.length; j++) {
                if (colors[j] == cantonColor) {
                    found = true;
                    break
                }
            }
        }
    }

    var stripeColors = [];
    for (var i = 0; i < colorPattern.length; i++) {
        stripeColors.push(colors[colorPattern[i]]);
    }


    var chargeIcon = choose({
        "☀": 1,
        "⎈": 1,
        "⬤": 1,
        "★": 1,
        "☗": 1,
        "☽︎": 1,
        "☠": 1,
        "☭": 1,
        "☯": 1,
        "☬": 1,
        "☫": 1,
        "☨": 1,
        "☩": 1,
        "♚": 1,
        "♛": 1,
        "♜": 1,
        "♞": 1,
        "⚒": 1,
        "⚓": 1,
        "⚔": 1,
        "⚙": 1,
        "⚛": 1,
        "⚜": 1,
        "⚡": 1,
        "✠": 1,
        "✡": 1,
        "✝": 1,
        "✬": 1,
        "✯": 1,
        "✲": 1,
        "✵": 1,
        "✸": 1,
        "❄": 1,
        "❧": 1,
        "❦": 1
    });
    if (stripesPoints.length > 1) {
        if (Math.random() > 0.7) {
            chargeIcon = "";
        }
    }

    return {
        dimensions: {
            heightRatio: 0.9,
            aspectRatio: 1.5,
        },
        swallowtails: {
            start: [1.0],
            points: [1.0],
            controls: ["o"],
        },
        stripes: {
            orient: orientation,
            points: stripesPoints,
            colors: stripeColors,
        },
        canton: {
            mode: cantonMode,
            color: cantonColor,
        },

        charge: chargeIcon
    }
}

function renderFlag(ele, flagConfig) {
    // make clip path
    var outsidePoints = clipFlagOutline(ele, flagConfig);

    drawStripes(ele, flagConfig);
    var cantonShape = drawCanton(ele, flagConfig);
    if (flagConfig.charge != "") {
        drawCharge(ele, flagConfig, cantonShape);
    }

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
    if (flagConfig.stripes.orient == "vertical") {
        drawVerticalStripes(ele, flagConfig);
    } else if (flagConfig.stripes.orient == "diagonal") {
        drawDiagonalStripes(ele, flagConfig);
    } else if (flagConfig.stripes.orient == "horizontal") {
        drawHorizontalStripes(ele, flagConfig);
    } else if (flagConfig.stripes.orient == "nordic") {
        drawNordicCross(ele, flagConfig);
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
        var prevLeft = [originX, originY];
        var prevRight = [originX + width, originY];
        if (i > 0) {
            prevLeft = stripes[i - 1][0];
            prevRight = stripes[i - 1][stripes[i - 1].length - 1];
        }

        if ((startY != originY) && (prevLeft[1] == originY)) {
            points.push([originX, originY]);
        }
        points.push(prevLeft);
        points.push(prevRight);
        if ((startY != originY) && (prevLeft[1] == originY)) {
            points.push([originX + width, originY + height]);
        }
        points.push([endX, endY]);

        drawPolygon(ele, points, "1", flagConfig.stripes.colors[i], flagConfig.stripes.colors[i]);
        stripes.push(points);
    }

    return stripes;
}

function drawNordicCross(ele, flagConfig) {
    var ret = getBoundingBox(ele, flagConfig);
    var originX = ret[0];
    var originY = ret[1];
    var width = ret[2];
    var height = ret[3];
    
    stripes = [];

    // draw background
    backPoints = [ [originX, originY], [originX + width, originY], 
                   [originX + width, originY + height], [originX, originY + height], 
                   [originX, originY] ];
    drawPolygon(ele, backPoints, "1", flagConfig.stripes.colors[0], flagConfig.stripes.colors[0]);    
    stripes.push(backPoints);

    endX = originX + width;
    endY = originY + height;
    
    och1f = (350/900) * height;
    och2f = (550/900) * height;

    och1 = originY + och1f;
    och2 = originY + och2f;

    ich1f = (400/900) * height;
    ich2f = (500/900) * height;

    ich1 = originY + ich1f;
    ich2 = originY + ich2f;

    ocv1 = originX + (och1 - originY);
    ocv2 = originX + (och2 - originY);
    icv1 = originX + (ich1 - originY);
    icv2 = originX + (ich2 - originY);

    outerCross = [ 
        [originX, och1],
        [ocv1, och1],
        [ocv1, originY],
        [ocv2, originY],
        [ocv2, och1],
        [endX, och1],
        [endX, och2],

        [ocv2, och2],
        [ocv2, endY],
        [ocv1, endY],
        [ocv1, och2],
        [originX, och2],
        [originX, och1],
    ];
    console.log(outerCross);
    drawPolygon(ele, outerCross, "1", flagConfig.stripes.colors[1], flagConfig.stripes.colors[1]);    
    stripes.push(outerCross);

    innerCross = [ 
        [originX, ich1],
        [icv1, ich1],
        [icv1, originY],
        [icv2, originY],
        [icv2, ich1],
        [endX, ich1],
        [endX, ich2],

        [icv2, ich2],
        [icv2, endY],
        [icv1, endY],
        [icv1, ich2],
        [originX, ich2],
        [originX, ich1],
    ];
    console.log(innerCross);
    drawPolygon(ele, innerCross, "1", flagConfig.stripes.colors[2], flagConfig.stripes.colors[2]);    
    stripes.push(innerCross);

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
        var midPointWidthFactor = 0.5 * Math.sqrt(3);
        var midPoint = height * midPointWidthFactor;

        // adjust to stripes
        if (flagConfig.stripes.orient == "vertical") {
            var bestAbsDelta = 2.0;
            var bestActualDelta = 0.0;
            var bestPoint = 0;
            for (var j = 0; j < flagConfig.stripes.points.length; j++) {
                var point = flagConfig.stripes.points[j];
                var delta = midPointWidthFactor - point;

                if (Math.abs(delta) <= bestAbsDelta) {
                    if ((Math.abs(delta) == bestAbsDelta) && (delta < 0)) {
                        bestAbsDelta = Math.abs(delta);
                        bestActualDelta = delta;
                        bestPoint = j - 1;
                    } else if (Math.abs(delta) < bestAbsDelta) {
                        bestAbsDelta = Math.abs(delta);
                        bestActualDelta = delta;
                        bestPoint = j - 1;
                    }
                }
            }
            if (bestAbsDelta < 0.2) {
                midPoint = width * flagConfig.stripes.points[bestPoint];
            }
        }

        points = [
            [originX, originY],
            [originX + midPoint, originY + (height / 2.0)],
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
            cantonWidth = cantonHeight;
        } else if (flagConfig.canton.mode == "bar") {
            cantonWidth = height / 2.0;
            cantonHeight = height;
        }

        if (flagConfig.stripes.orient == "nordic") {
            cantonHeight = (350/900) * height;
            cantonWidth = cantonHeight;
            flagConfig.canton.mode = "square";
        } else {
            if ((flagConfig.canton.mode == "square") ||
                (flagConfig.canton.mode == "rectangle")) {
                // adjust to stripes
                var bestAbsDelta = 2.0;
                var bestActualDelta = 0.0;
                for (var j = 0; j < flagConfig.stripes.points.length; j++) {
                    var point = flagConfig.stripes.points[j];
                    var delta;
                    if (flagConfig.stripes.orient == "vertical") {
                        delta = point - 0.5;
                    } else {
                        delta = point - 0.5;
                    }


                    if (Math.abs(delta) <= bestAbsDelta) {
                        if ((Math.abs(delta) == bestAbsDelta) && (delta < 0)) {
                            bestAbsDelta = Math.abs(delta);
                            bestActualDelta = delta;
                        } else if (Math.abs(delta) < bestAbsDelta) {
                            bestAbsDelta = Math.abs(delta);
                            bestActualDelta = delta;
                        }
                    }
                }

                if (bestAbsDelta < 0.2) {
                    if (flagConfig.canton.mode == "square") {
                        if (flagConfig.stripes.orient == "vertical") {
                            cantonWidth = width * (0.5 + bestActualDelta);
                            cantonHeight = cantonWidth;
                        } else {
                            cantonHeight = height * (0.5 + bestActualDelta);
                            cantonWidth = cantonHeight;
                        }
                    } else {
                        if (flagConfig.stripes.orient == "vertical") {
                            cantonWidth = width * (0.5 + bestActualDelta);
                            cantonHeight = height * 0.5;
                        } else {
                            cantonHeight = height * (0.5 + bestActualDelta);
                            cantonWidth = width * 0.5;
                        }
                    }
                }
            }
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

function drawCharge(ele, flagConfig, cantonShape) {
    var ret = getBoundingBox(ele, flagConfig);
    var originX = ret[0];
    var originY = ret[1];
    var width = ret[2];
    var height = ret[3];

    var icon = flagConfig.charge;

    var ctx =  ele.getContext("2d");

    ctx.textAlign = "center";

    var blazonX;
    var blazonY;
    var blazonHeight
    if (flagConfig.canton.mode == "none") {
        blazonHeight = (height / 2.0);
        blazonX = originX + (width / 2.0);
        blazonY = originY + (height * 0.65);
        
        if (flagConfig.stripes.orient == "nordic") {
            blazonHeight = (100 / 900)  * height;
            blazonX = originX + (0.5 * height);
            blazonY = originY + (0.5 * height);
        }
    } else if (cantonShape.length == 4) {
        var cantonWidth  = cantonShape[1][0] - cantonShape[0][0];
        var cantonHeight = cantonShape[3][1] - cantonShape[0][1];
        blazonHeight = cantonHeight / 2.0;
        blazonX = originX + (cantonWidth / 2.0);
        blazonY = originY + (cantonHeight / 2.0);
    } else if (cantonShape.length == 3) {
        var cantonHeight = cantonShape[2][1] - cantonShape[0][1];
        blazonX = originX + (0.15 * width);
        blazonY = originY + (cantonHeight * 0.60);
        ctx.font = (height / 2.0) + "px Arial";
    }


    ctx.fillStyle = "white";
    if (flagConfig.canton.mode != "none") {
        if ((flagConfig.canton.color == "white") ||
            (flagConfig.canton.color == "yellow")) {
            ctx.fillStyle = "black";
        }
    } else {


        var checkPoints = [
            [ blazonX - blazonHeight, blazonY - blazonHeight ],
            [ blazonX - blazonHeight, blazonY + blazonHeight ],
            [ blazonX + blazonHeight, blazonY - blazonHeight ],
            [ blazonX + blazonHeight, blazonY + blazonHeight ]
        ];


        for (var i = 0; i < flagConfig.stripes.colors.length; i++) {
            var color = flagConfig.stripes.colors[i];
            if ((color == "white") ||
                (color == "yellow")) {
                ctx.fillStyle = "black";
                break;
            }
        }
    }

    ctx.font = blazonHeight + "px Arial";
    ctx.fillText(icon, blazonX, blazonY);

    return icon;
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

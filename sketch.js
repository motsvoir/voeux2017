// données images
var prairie;
var chatVivant;
var chatMort;
var chat;
var souris;
var aller;
var retour;
var triCycle;
// données numérique
var pasTricycle; // déplacement du tricycle à chaque image
var sens = 1;
var xTricycle;
var minTricycle; // x min du tricycle
var maxTricycle;
var yTricycle;
var xChat = 5;
var yChat = 40;
var tailleChat = 1;
var seq = 0;
var nbSouris = 0; // nb de souris croquées par le chat
var nbSourisMax = 30;
//var id = 0; // n° d'index des souris dans la liste rongeurs
// liste des objets
//var rongeurs = [];
var enVie = [];
var police;
var sel;

function preload() {
  police = loadFont("data/MTCORSVA.TTF");
  prairie = loadImage("data/prairie_v2.png");
  chatVivant = loadImage("data/piteau_2017_fond_transparent_petit.png"); // chat_2017_v1_fond_transparent_petit
  chatMort = loadImage("data/piteau_2017_fond_transparent_petit_180.png");  // chat_2017_v1_fond_transparent_petit_mort
  souris = loadImage("data/souris_2016_v3_fond_transparent_petit.png");
  aller = loadImage("data/tricycle_poupette_fond_transparent_petit.png");
  retour = loadImage("data/tricycle_retour_petit_fond_transparent.png");
}

function setup() {
  createCanvas(800, 600);
  var rate = 30;
  var duree = 10; // durée d'un aller du tricycle en s
  textFont("police");
  textSize(30);
  textAlign(CENTER, CENTER);
  pasTricycle = (width + aller.width) / (duree * rate);
  frameRate(rate);
  imageMode(CENTER);
  image(prairie, width / 2, height / 2, 800, 600);
  tricycle = aller;
  chat = chatVivant;
  minTricycle = -aller.width / 2;
  xTricycle = minTricycle;
  maxTricycle = width - minTricycle;
  yTricycle = height / 2;
  for (var i = 1; i < 4; i++) {
    var x0 = random(33, 377);
    var y0 = random(33, 150);
    var souris1 = new Souris(x0, y0);
    x0 = random(433, 767);
    souris1 = new Souris(x0, y0);
    y0 = random(450, 567);
    souris1 = new Souris(x0, y0);
    x0 = random(33, 377);
    souris1 = new Souris(x0, y0);
  }
}

function draw() {
  image(prairie, width / 2, height / 2, 800, 600);
  switch (seq) {
    case 0:
      seq0();
      break;
    case 1:
      seq1();
      break;
    case 2:
      seq2();
      break;
    case 3:
      seq3();
      break;
    case 4:
      seq4();
      break;
    case 5:
      seq5();
      break;
    case 6:
      seq5mort();
      break;
  }
}

function afficheTitre() {
  textSize(30);
  textStyle(NORMAL);
  fill(0);
  image(chat, xChat, yChat, chat.width * 1.5, chat.height * 1.5);
  var texte = "Votre chat Piteau\nsaura-t-il faire advenir la nouvelle année\nen croquant à coup de clics\nles dernières souris de 2016\navant qu'elles ne prolifèrent et ne le submergent ?\n\n\nPoupette l'aide en les écrasant avec son tricyccle."
  text(texte, width / 2, height / 2-30);
  deplaceTricycle();
  textSize(20);
  textStyle(BOLD);
  fill(178, 53, 53)
  texte = "nombre initial de souris : "
  text(texte, 500, 508);
  //fill(0);
  //textStyle(ITALIC);
  texte = "(quand le chat est prêt d'une souris, cliquez pour la croquer)"
  text (texte,500,530);
}

function creeSelect() {
  sel = createSelect();
  sel.position(600, 500);
  sel.option(" ");
  sel.option("12");
  sel.option("11");
  sel.option("10");
  sel.option("9");
  sel.option("8");
  sel.option("7");
  sel.option("6");
  sel.option("5");
  sel.option("4");
  sel.option("3");
  sel.option("2");
  sel.changed(mySelectEvent);
  seq = 1;
}

function mySelectEvent() {
  var item = sel.value();
  removeElements();
  seq = 2;
  for (var i = enVie.length - 1; i > item - 1; i--) {
    enVie.splice(i, 1);
  }
  fill(0, 64, 128);
  textStyle(NORMAL);
  textSize(40);
  textStyle(BOLD);
}

function seq0() {
  afficheTitre();
  creeSelect();
}

function seq1() {
  afficheTitre();
}

function seq2() {
  for (var i = 0; i < enVie.length; i++) {
    enVie[i].deplace(); // déplace la souris i
  }
  deplaceTricycle();
  deplaceChat();
  // élimination des souris mortes
  for (var i = 0; i < enVie.length; i++) {
    if (!enVie[i].enVie) {
      enVie.splice(i, 1);
    }
  }
  if (enVie.length == 0) {
    seq = 3;
  }
  //recherche des naissances
  var naissance = false;
  for (var i = 1; i < enVie.length; i++) {
    if (enVie[i].taille == 1) {
      for (var j = 0; j < i; j++) {
        if (enVie[j].taille == 1) {
          var d = distance(enVie[i].x, enVie[i].y, enVie[j].x, enVie[j].y);
          if (d < 18) {
            var nsouris = new Souris(enVie[i].x, enVie[i].y);
            naissance = true;
          }
        }
        if (naissance) {
          break;
        }
      }
    }
    if (naissance) {
      break;
    }
  }
}

// séquences de fin heureuse
function seq3() {
  deplaceTricycle();
  tailleChat += 0.1;
  if (tailleChat >= 4) {
    tailleChat = 4;
    seq = 4;
  }
  granditChat();
}

function seq4() {
  deplaceTricycle();
  granditChat();
}

function seq5() {
  granditChat();
}

// séquence de fin malheureuse
function seq5mort(){
  for (var i = 0; i < enVie.length; i++) {
    enVie[i].deplace(); // déplace la souris i
  }
   deplaceTricycle();
  image(chat,xChat,yChat);
  var texte = "Aargh!\nIndigestion de souris!"
  text(texte,xChat-30,yChat+50);
}

//------------------ gestion du chat ------------------------------

function deplaceChat() {
  xChat = mouseX;
  yChat = mouseY;
  image(chat, xChat, yChat);
}

function mouseClicked() {
  if (seq == 2) {
    for (var i = 0; i < enVie.length; i++) {
      if (enVie[i].enVie) {
        var d = distanceChatSouris(enVie[i]);
        if (d < 120) {
          xChat = enVie[i].x;
          yChat = enVie[i].y;
          enVie[i].enVie = false;
          nbSouris++;
          if (nbSouris >= nbSourisMax){
            chat = chatMort;
            seq = 6;
          }
          break;
        }
      }
    }
    image(chat, xChat, yChat);
    return false;
  }
}

function distanceChatSouris(id) {
  var x1 = xChat;
  var y1 = yChat;
  var x2 = id.x;
  var y2 = id.y;
  var d = distance(x1, y1, x2, y2);
  return d;
}

function granditChat() {
  image(chat, xChat, yChat, chat.width * tailleChat, chat.height * tailleChat);
  if (tailleChat >= 4) {
    var texte;
    if (nbSouris > 0) {
      texte = "eh eh !\nl\'année commence bien\nJ\'ai déjà croqué " + nbSouris + " souris"
    } else {
      texte = "bof.\nRouillé en ce début d\'année\nJ\'ai raté les souris"
    }
    text(texte, xChat + 5, yChat - 120);
  }
}

// faire saut du chat sur une souris

// ----------------------- gestion poupette --------------------------

function deplaceTricycle() {
  xTricycle += sens * pasTricycle;
  if (sens == 1) {
    if (xTricycle >= maxTricycle) {
      xTricycle = maxTricycle;
      sens = -1;
      tricycle = retour;
      if (seq == 4) {
        seq = 5;
      }
    }
  } else {
    if (xTricycle <= minTricycle) {
      xTricycle = minTricycle;
      sens = 1;
      tricycle = aller;
      if (seq == 4) {
        seq = 5;
      }
    }
  }
  image(tricycle, xTricycle, yTricycle);
}

// ---------------------------- gestion souris -------------------------

function Souris(x0, y0) {
  this.x = x0; //= Math.random(33,200);  //position courante en x
  this.y = y0; // position courante en y
  this.xFinal;
  this.yFinal;
  this.taille = 0.3;
  this.pasTaille = 0.7 / 30;
  this.enVie = true;
  this.final = 5; // seuil pour considérer l'objectif atteint
  //this.iD; // id = n° de l'index de l'objet dans la liste rongeurs

  this.objectif = function() {
    this.xFinal = Math.random() * 734 + 33;
    this.yFinal = Math.random() * 534 + 33;
    while (abs(this.xFinal - xChat) < 90) {
      this.xFinal = Math.random() * 734 + 33;
    }
    while (abs(this.yFinal - yChat) < 100) {
      this.yFinal = Math.random() * 534 + 33;
    }
  }

  this.deplace = function() {
    var dx = (this.xFinal - this.x);
    var dy = (this.yFinal - this.y);
    if ((dx <= this.final) && (dy <= this.final)) {
      this.objectif();
    }
    this.x += dx * 0.05;
    this.y += dy * 0.05;
    var d = distanceChatSouris(this);
    if (d < 100) {
      this.objectif();
    }
    if (this.taille < 1) {
      image(souris, this.x, this.y, souris.width * this.taille, souris.height * this.taille);
      this.taille += this.pasTaille;
      if (this.taille >= 1) {
        this.taille = 1;
      }
    } else {
      image(souris, this.x, this.y);
    }
    dx = this.x - xTricycle;
    if (dx > -30 && dx < 68) {
      dy = this.y - yTricycle;
      if (dy > 50 && dy < 104) {
        this.enVie = false;
      }
    }
  }

  this.imposeFinal = function(x, y) {
    this.xFinal = x;
    this.yFinal = y;
  }

  // instructions exécutées à la création
  enVie.push(this);
  //rongeurs.push(this);
  //this.iD = id;
  //id++;
  this.objectif();
}

//------------------ fonction annexe

function distance(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  var d = sqrt(dx * dx + dy * dy);
  return d;
}
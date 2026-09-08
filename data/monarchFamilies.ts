export interface PersonNode {
  name: string;
  relation?: string;
  dates?: string;
  notes?: string;
  monarchId?: number; // Links to another monarch in our list (1-41)
  isMonarch?: boolean;
}

export interface SpouseGroup {
  spouse: PersonNode;
  marriageDate?: string;
  children: PersonNode[];
}

export interface MonarchFamily {
  monarchId: number;
  parents: {
    father?: PersonNode;
    mother?: PersonNode;
  };
  spouses: SpouseGroup[];
  otherChildren?: PersonNode[];
  notes?: string;
}

export const monarchFamilies: Record<number, MonarchFamily> = {
  // 1. William I
  1: {
    monarchId: 1,
    parents: {
      father: { name: "Robert I", relation: "Father", notes: "Duke of Normandy ('The Magnificent')" },
      mother: { name: "Herleva of Falaise", relation: "Mother", notes: "Mother of William I and Odo of Bayeux" }
    },
    spouses: [
      {
        spouse: { name: "Matilda of Flanders", relation: "Spouse", dates: "c. 1031–1083", notes: "Queen consort of England; crowned at Winchester" },
        marriageDate: "m. c. 1051/1053",
        children: [
          { name: "Robert Curthose", relation: "Son", dates: "c. 1051–1134", notes: "Duke of Normandy; leader in First Crusade" },
          { name: "Richard of Normandy", relation: "Son", dates: "c. 1054–c. 1070", notes: "Died in hunting accident in the New Forest" },
          { name: "William II (Rufus)", relation: "Son", dates: "c. 1056–1100", notes: "King of England (1087–1100)", monarchId: 2, isMonarch: true },
          { name: "Henry I (Beauclerc)", relation: "Son", dates: "c. 1068–1135", notes: "King of England (1100–1135)", monarchId: 3, isMonarch: true },
          { name: "Adela of Normandy", relation: "Daughter", dates: "c. 1067–1137", notes: "Countess of Blois; mother of King Stephen" },
          { name: "Cecilia of Normandy", relation: "Daughter", dates: "c. 1056–1126", notes: "Abbess of Holy Trinity, Caen" },
          { name: "Constance of Normandy", relation: "Daughter", dates: "c. 1061–1090", notes: "Duchess of Brittany" },
          { name: "Agatha of Normandy", relation: "Daughter", dates: "c. 1064–1079", notes: "Betrothed to Alfonso VI of León" }
        ]
      }
    ]
  },

  // 2. William II
  2: {
    monarchId: 2,
    parents: {
      father: { name: "William I", relation: "Father", notes: "King of England (1066–1087)", monarchId: 1, isMonarch: true },
      mother: { name: "Matilda of Flanders", relation: "Mother", notes: "Queen consort of England" }
    },
    spouses: [],
    notes: "William II never married and had no known legitimate or illegitimate children. He was succeeded on his death by his younger brother Henry I."
  },

  // 3. Henry I
  3: {
    monarchId: 3,
    parents: {
      father: { name: "William I", relation: "Father", notes: "King of England (1066–1087)", monarchId: 1, isMonarch: true },
      mother: { name: "Matilda of Flanders", relation: "Mother", notes: "Queen consort of England" }
    },
    spouses: [
      {
        spouse: { name: "Matilda of Scotland", relation: "Spouse", dates: "c. 1080–1118", notes: "Daughter of Malcolm III of Scotland & Saint Margaret" },
        marriageDate: "m. 1100",
        children: [
          { name: "Empress Matilda", relation: "Daughter", dates: "1102–1167", notes: "Lady of the English; mother of King Henry II" },
          { name: "William Adelin", relation: "Son", dates: "1103–1120", notes: "Duke of Normandy; died in the tragic White Ship disaster" }
        ]
      },
      {
        spouse: { name: "Adeliza of Louvain", relation: "Spouse", dates: "c. 1103–1151", notes: "Queen consort of England; married Henry in hope of an heir" },
        marriageDate: "m. 1121",
        children: []
      }
    ],
    otherChildren: [
      { name: "Robert, 1st Earl of Gloucester", relation: "Son (acknowledged)", dates: "c. 1090–1147", notes: "Key military leader supporting Empress Matilda in the Anarchy" },
      { name: "Sybilla of Normandy", relation: "Daughter (acknowledged)", dates: "c. 1092–1122", notes: "Queen consort of Scotland, wife of Alexander I" },
      { name: "Reginald de Dunstanville, 1st Earl of Cornwall", relation: "Son (acknowledged)", dates: "c. 1110–1175", notes: "Sheriff of Devon & Earl of Cornwall" },
      { name: "Maud FitzRoy", relation: "Daughter (acknowledged)", dates: "d. 1120", notes: "Countess of Perche; died in the White Ship disaster" }
    ],
    notes: "Following the death of his only legitimate son William Adelin in the White Ship disaster (1120), Henry named his daughter Empress Matilda his heir, precipitating 'The Anarchy'."
  },

  // 4. Stephen
  4: {
    monarchId: 4,
    parents: {
      father: { name: "Stephen, Count of Blois", relation: "Father", notes: "Leader of the First Crusade" },
      mother: { name: "Adela of Normandy", relation: "Mother", notes: "Daughter of William the Conqueror" }
    },
    spouses: [
      {
        spouse: { name: "Matilda I, Countess of Boulogne", relation: "Spouse", dates: "1105–1152", notes: "Queen consort; fiercely supported Stephen during the Anarchy" },
        marriageDate: "m. 1125",
        children: [
          { name: "Eustace IV, Count of Boulogne", relation: "Son", dates: "c. 1130–1153", notes: "Heir apparent until his sudden death in 1153" },
          { name: "William I, Count of Boulogne", relation: "Son", dates: "c. 1137–1159", notes: "Earl of Surrey and Count of Boulogne" },
          { name: "Marie I, Countess of Boulogne", relation: "Daughter", dates: "1136–1182", notes: "Abbess of Romsey, later Countess of Boulogne" },
          { name: "Baldwin of Boulogne", relation: "Son", dates: "d. before 1135", notes: "Died in infancy" },
          { name: "Matilda of Boulogne", relation: "Daughter", dates: "d. before 1141", notes: "Betrothed to Waleran de Beaumont; died in childhood" }
        ]
      }
    ],
    otherChildren: [
      { name: "Gervase of Blois", relation: "Son (illegitimate)", dates: "c. 1115–1160", notes: "Abbot of Westminster" }
    ]
  },

  // 5. Henry II
  5: {
    monarchId: 5,
    parents: {
      father: { name: "Geoffrey Plantagenet", relation: "Father", notes: "Count of Anjou & Duke of Normandy" },
      mother: { name: "Empress Matilda", relation: "Mother", notes: "Lady of the English; daughter of Henry I" }
    },
    spouses: [
      {
        spouse: { name: "Eleanor of Aquitaine", relation: "Spouse", dates: "1122–1204", notes: "Duchess of Aquitaine; one of the wealthiest & most powerful women of the Middle Ages" },
        marriageDate: "m. 1152",
        children: [
          { name: "William IX, Count of Poitiers", relation: "Son", dates: "1153–1156", notes: "Died in early childhood" },
          { name: "Henry the Young King", relation: "Son", dates: "1155–1183", notes: "Crowned junior King of England; predeceased his father" },
          { name: "Matilda of England", relation: "Daughter", dates: "1156–1189", notes: "Duchess of Saxony and Bavaria (wife of Henry the Lion)" },
          { name: "Richard I (The Lionheart)", relation: "Son", dates: "1157–1199", notes: "King of England (1189–1199)", monarchId: 6, isMonarch: true },
          { name: "Geoffrey II, Duke of Brittany", relation: "Son", dates: "1158–1186", notes: "Father of Arthur I, Duke of Brittany" },
          { name: "Eleanor of England", relation: "Daughter", dates: "1161–1214", notes: "Queen of Castile (wife of Alfonso VIII)" },
          { name: "Joan of England", relation: "Daughter", dates: "1165–1199", notes: "Queen of Sicily and Countess of Toulouse" },
          { name: "John (Lackland)", relation: "Son", dates: "1166–1216", notes: "King of England (1199–1216)", monarchId: 7, isMonarch: true }
        ]
      }
    ],
    otherChildren: [
      { name: "Geoffrey, Archbishop of York", relation: "Son (acknowledged)", dates: "c. 1152–1212", notes: "Lord Chancellor and Archbishop of York" },
      { name: "William Longespée, 3rd Earl of Salisbury", relation: "Son (acknowledged)", dates: "c. 1176–1226", notes: "Commander at Battle of Damme" }
    ]
  },

  // 6. Richard I
  6: {
    monarchId: 6,
    parents: {
      father: { name: "Henry II", relation: "Father", notes: "King of England (1154–1189)", monarchId: 5, isMonarch: true },
      mother: { name: "Eleanor of Aquitaine", relation: "Mother", notes: "Duchess of Aquitaine & Queen of England" }
    },
    spouses: [
      {
        spouse: { name: "Berengaria of Navarre", relation: "Spouse", dates: "c. 1165–1230", notes: "Queen consort of England; married in Cyprus during the Third Crusade" },
        marriageDate: "m. 1191",
        children: []
      }
    ],
    otherChildren: [
      { name: "Philip of Cognac", relation: "Son (illegitimate)", dates: "early 1180s–after 1201", notes: "Lord of Cognac" }
    ],
    notes: "Richard I spent only about six months of his 10-year reign in England. He had no legitimate children and was succeeded by his brother John."
  },

  // 7. John
  7: {
    monarchId: 7,
    parents: {
      father: { name: "Henry II", relation: "Father", notes: "King of England (1154–1189)", monarchId: 5, isMonarch: true },
      mother: { name: "Eleanor of Aquitaine", relation: "Mother", notes: "Duchess of Aquitaine & Queen of England" }
    },
    spouses: [
      {
        spouse: { name: "Isabel of Gloucester", relation: "Spouse", dates: "c. 1173–1217", notes: "Countess of Gloucester; marriage annulled in 1199 on grounds of consanguinity" },
        marriageDate: "m. 1189 (annulled 1199)",
        children: []
      },
      {
        spouse: { name: "Isabella of Angoulême", relation: "Spouse", dates: "c. 1188–1246", notes: "Queen consort of England; mother of Henry III" },
        marriageDate: "m. 1200",
        children: [
          { name: "Henry III", relation: "Son", dates: "1207–1272", notes: "King of England (1216–1272)", monarchId: 8, isMonarch: true },
          { name: "Richard, 1st Earl of Cornwall", relation: "Son", dates: "1209–1272", notes: "King of the Romans; one of the wealthiest men in Europe" },
          { name: "Joan of England", relation: "Daughter", dates: "1210–1238", notes: "Queen consort of Scotland (wife of Alexander II)" },
          { name: "Isabella of England", relation: "Daughter", dates: "1214–1241", notes: "Holy Roman Empress (wife of Frederick II)" },
          { name: "Eleanor of England", relation: "Daughter", dates: "1215–1275", notes: "Countess of Leicester (wife of Simon de Montfort)" }
        ]
      }
    ],
    otherChildren: [
      { name: "Joan, Lady of Wales", relation: "Daughter (acknowledged)", dates: "c. 1191–1237", notes: "Wife of Llywelyn the Great, Prince of Gwynedd" },
      { name: "Richard FitzRoy", relation: "Son (acknowledged)", dates: "c. 1190–1246", notes: "Feudal baron of Chilham in Kent" }
    ]
  },

  // 8. Henry III
  8: {
    monarchId: 8,
    parents: {
      father: { name: "John", relation: "Father", notes: "King of England (1199–1216)", monarchId: 7, isMonarch: true },
      mother: { name: "Isabella of Angoulême", relation: "Mother", notes: "Countess of Angoulême & Queen of England" }
    },
    spouses: [
      {
        spouse: { name: "Eleanor of Provence", relation: "Spouse", dates: "c. 1223–1291", notes: "Queen consort of England; crowned at Westminster Abbey in 1236" },
        marriageDate: "m. 1236",
        children: [
          { name: "Edward I (Longshanks)", relation: "Son", dates: "1239–1307", notes: "King of England (1272–1307)", monarchId: 9, isMonarch: true },
          { name: "Margaret of England", relation: "Daughter", dates: "1240–1275", notes: "Queen consort of Scotland (wife of Alexander III)" },
          { name: "Beatrice of England", relation: "Daughter", dates: "1242–1275", notes: "Duchess of Brittany (wife of John II)" },
          { name: "Edmund Crouchback", relation: "Son", dates: "1245–1296", notes: "1st Earl of Lancaster and Leicester; founder of House of Lancaster" },
          { name: "Katherine of England", relation: "Daughter", dates: "1253–1257", notes: "Died in childhood; deaf and mute according to chroniclers" }
        ]
      }
    ]
  },

  // 9. Edward I
  9: {
    monarchId: 9,
    parents: {
      father: { name: "Henry III", relation: "Father", notes: "King of England (1216–1272)", monarchId: 8, isMonarch: true },
      mother: { name: "Eleanor of Provence", relation: "Mother", notes: "Queen consort of England" }
    },
    spouses: [
      {
        spouse: { name: "Eleanor of Castile", relation: "Spouse", dates: "1241–1290", notes: "Queen consort; Eleanor crosses erected in her memory" },
        marriageDate: "m. 1254",
        children: [
          { name: "Eleanor of England", relation: "Daughter", dates: "1269–1298", notes: "Countess of Bar" },
          { name: "Joan of Acre", relation: "Daughter", dates: "1272–1307", notes: "Countess of Gloucester and Hertford" },
          { name: "Alphonso, Earl of Chester", relation: "Son", dates: "1273–1284", notes: "Heir apparent who tragically died aged 10" },
          { name: "Margaret of England", relation: "Daughter", dates: "1275–1333", notes: "Duchess of Brabant" },
          { name: "Mary of Woodstock", relation: "Daughter", dates: "1279–1332", notes: "Benedictine nun at Amesbury Priory" },
          { name: "Elizabeth of Rhuddlan", relation: "Daughter", dates: "1282–1316", notes: "Countess of Hereford" },
          { name: "Edward II", relation: "Son", dates: "1284–1327", notes: "First English Prince of Wales; King of England (1307–1327)", monarchId: 10, isMonarch: true }
        ]
      },
      {
        spouse: { name: "Margaret of France", relation: "Spouse", dates: "c. 1279–1318", notes: "Daughter of Philip III of France; Queen consort of England" },
        marriageDate: "m. 1299",
        children: [
          { name: "Thomas of Brotherton, 1st Earl of Norfolk", relation: "Son", dates: "1300–1338", notes: "Earl Marshal of England" },
          { name: "Edmund of Woodstock, 1st Earl of Kent", relation: "Son", dates: "1301–1330", notes: "Father of Joan 'The Fair Maid of Kent'" },
          { name: "Eleanor of England", relation: "Daughter", dates: "1306–1311", notes: "Died in childhood" }
        ]
      }
    ]
  },

  // 10. Edward II
  10: {
    monarchId: 10,
    parents: {
      father: { name: "Edward I", relation: "Father", notes: "King of England (1272–1307)", monarchId: 9, isMonarch: true },
      mother: { name: "Eleanor of Castile", relation: "Mother", notes: "Queen consort of England" }
    },
    spouses: [
      {
        spouse: { name: "Isabella of France", relation: "Spouse", dates: "c. 1295–1358", notes: "Known as the 'She-Wolf of France'; led invasion that deposed Edward II" },
        marriageDate: "m. 1308",
        children: [
          { name: "Edward III", relation: "Son", dates: "1312–1377", notes: "King of England (1327–1377)", monarchId: 11, isMonarch: true },
          { name: "John of Eltham, Earl of Cornwall", relation: "Son", dates: "1316–1336", notes: "Guardian of the Realm during Edward III's absences" },
          { name: "Eleanor of Woodstock", relation: "Daughter", dates: "1318–1355", notes: "Countess and Duchess of Guelders" },
          { name: "Joan of The Tower", relation: "Daughter", dates: "1321–1362", notes: "Queen consort of Scotland (wife of David II)" }
        ]
      }
    ],
    otherChildren: [
      { name: "Adam FitzRoy", relation: "Son (illegitimate)", dates: "c. 1307–1322", notes: "Accompanied his father on Scottish campaigns" }
    ]
  },

  // 11. Edward III
  11: {
    monarchId: 11,
    parents: {
      father: { name: "Edward II", relation: "Father", notes: "King of England (1307–1327)", monarchId: 10, isMonarch: true },
      mother: { name: "Isabella of France", relation: "Mother", notes: "Queen consort of England" }
    },
    spouses: [
      {
        spouse: { name: "Philippa of Hainault", relation: "Spouse", dates: "1314–1369", notes: "Beloved Queen consort; interceded to save the Burghers of Calais" },
        marriageDate: "m. 1328",
        children: [
          { name: "Edward of Woodstock ('The Black Prince')", relation: "Son", dates: "1330–1376", notes: "Prince of Wales, legendary warrior; father of Richard II" },
          { name: "Isabella of England", relation: "Daughter", dates: "1332–1379", notes: "Countess of Bedford" },
          { name: "Joan of England", relation: "Daughter", dates: "1335–1348", notes: "Died of the Black Death on her way to marry Peter of Castile" },
          { name: "Lionel of Antwerp, 1st Duke of Clarence", relation: "Son", dates: "1338–1368", notes: "Ancestor of the Yorkist royal line" },
          { name: "John of Gaunt, 1st Duke of Lancaster", relation: "Son", dates: "1340–1399", notes: "Father of Henry IV; founder of royal House of Lancaster" },
          { name: "Edmund of Langley, 1st Duke of York", relation: "Son", dates: "1341–1402", notes: "Founder of royal House of York" },
          { name: "Mary of Waltham", relation: "Daughter", dates: "1344–1362", notes: "Duchess of Brittany" },
          { name: "Margaret of Windsor", relation: "Daughter", dates: "1346–1361", notes: "Countess of Pembroke" },
          { name: "Thomas of Woodstock, 1st Duke of Gloucester", relation: "Son", dates: "1355–1397", notes: "Leader of the Lords Appellant against Richard II" }
        ]
      }
    ]
  },

  // 12. Richard II
  12: {
    monarchId: 12,
    parents: {
      father: { name: "Edward of Woodstock ('The Black Prince')", relation: "Father", notes: "Prince of Wales; eldest son of Edward III" },
      mother: { name: "Joan of Kent", relation: "Mother", notes: "'The Fair Maid of Kent'; 4th Countess of Kent" }
    },
    spouses: [
      {
        spouse: { name: "Anne of Bohemia", relation: "Spouse", dates: "1366–1394", notes: "Queen consort; daughter of Holy Roman Emperor Charles IV" },
        marriageDate: "m. 1382",
        children: []
      },
      {
        spouse: { name: "Isabella of Valois", relation: "Spouse", dates: "1389–1409", notes: "Daughter of Charles VI of France; married at age 6" },
        marriageDate: "m. 1396",
        children: []
      }
    ],
    notes: "Richard II had no children from either marriage. In 1399 he was deposed and imprisoned by his cousin Henry IV, bringing an end to the direct Plantagenet line."
  },

  // 13. Henry IV
  13: {
    monarchId: 13,
    parents: {
      father: { name: "John of Gaunt", relation: "Father", notes: "1st Duke of Lancaster; 3rd surviving son of Edward III" },
      mother: { name: "Blanche of Lancaster", relation: "Mother", notes: "Duchess of Lancaster; wealthy heiress" }
    },
    spouses: [
      {
        spouse: { name: "Mary de Bohun", relation: "Spouse", dates: "c. 1369–1394", notes: "Countess of Derby; died before Henry claimed the crown" },
        marriageDate: "m. 1380",
        children: [
          { name: "Henry V", relation: "Son", dates: "1386–1422", notes: "King of England (1413–1422); victor of Agincourt", monarchId: 14, isMonarch: true },
          { name: "Thomas of Lancaster, 1st Duke of Clarence", relation: "Son", dates: "1387–1421", notes: "Killed at the Battle of Baugé" },
          { name: "John of Lancaster, 1st Duke of Bedford", relation: "Son", dates: "1389–1435", notes: "Regent of France for his nephew Henry VI" },
          { name: "Humphrey of Lancaster, 1st Duke of Gloucester", relation: "Son", dates: "1390–1447", notes: "Protector of the Realm; patron of Oxford University" },
          { name: "Blanche of England", relation: "Daughter", dates: "1392–1409", notes: "Electress Palatine" },
          { name: "Philippa of England", relation: "Daughter", dates: "1394–1430", notes: "Queen of Denmark, Sweden, and Norway" }
        ]
      },
      {
        spouse: { name: "Joan of Navarre", relation: "Spouse", dates: "c. 1370–1437", notes: "Queen consort of England; formerly Duchess of Brittany" },
        marriageDate: "m. 1403",
        children: []
      }
    ]
  },

  // 14. Henry V
  14: {
    monarchId: 14,
    parents: {
      father: { name: "Henry IV", relation: "Father", notes: "King of England (1399–1413)", monarchId: 13, isMonarch: true },
      mother: { name: "Mary de Bohun", relation: "Mother", notes: "Countess of Derby" }
    },
    spouses: [
      {
        spouse: { name: "Catherine of Valois", relation: "Spouse", dates: "1401–1437", notes: "Daughter of Charles VI of France; later secretly married Owen Tudor" },
        marriageDate: "m. 1420",
        children: [
          { name: "Henry VI", relation: "Son", dates: "1421–1471", notes: "King of England (1422–1461, 1470–1471); crowned King of France", monarchId: 15, isMonarch: true }
        ]
      }
    ],
    notes: "Henry V died of dysentery at Vincennes in 1422 aged 35, leaving his 9-month-old infant son Henry VI to inherit both the English and French crowns."
  },

  // 15. Henry VI
  15: {
    monarchId: 15,
    parents: {
      father: { name: "Henry V", relation: "Father", notes: "King of England (1413–1422)", monarchId: 14, isMonarch: true },
      mother: { name: "Catherine of Valois", relation: "Mother", notes: "Queen consort of England" }
    },
    spouses: [
      {
        spouse: { name: "Margaret of Anjou", relation: "Spouse", dates: "1430–1482", notes: "Fierce leader of the Lancastrian faction during the Wars of the Roses" },
        marriageDate: "m. 1445",
        children: [
          { name: "Edward of Westminster, Prince of Wales", relation: "Son", dates: "1453–1471", notes: "Only son; killed at the Battle of Tewkesbury aged 17" }
        ]
      }
    ],
    notes: "Following the death of Prince Edward at Tewkesbury in May 1471, Henry VI was imprisoned in the Tower of London and killed shortly thereafter."
  },

  // 16. Edward IV
  16: {
    monarchId: 16,
    parents: {
      father: { name: "Richard, 3rd Duke of York", relation: "Father", notes: "Lord Protector; Yorkist claimant killed at Battle of Wakefield" },
      mother: { name: "Cecily Neville", relation: "Mother", notes: "'Proud Cis'; Duchess of York" }
    },
    spouses: [
      {
        spouse: { name: "Elizabeth Woodville", relation: "Spouse", dates: "c. 1437–1492", notes: "Queen consort; secret marriage alienated the Earl of Warwick" },
        marriageDate: "m. 1464",
        children: [
          { name: "Elizabeth of York", relation: "Daughter", dates: "1466–1503", notes: "Queen consort of Henry VII; mother of Henry VIII" },
          { name: "Mary of York", relation: "Daughter", dates: "1467–1482", notes: "Died at age 14" },
          { name: "Cecily of York", relation: "Daughter", dates: "1469–1507", notes: "Viscountess Welles" },
          { name: "Edward V", relation: "Son", dates: "1470–1483", notes: "King of England; elder Prince in the Tower", monarchId: 17, isMonarch: true },
          { name: "Margaret of York", relation: "Daughter", dates: "1472", notes: "Died in infancy" },
          { name: "Richard of Shrewsbury, 1st Duke of York", relation: "Son", dates: "1473–1483", notes: "Younger Prince in the Tower" },
          { name: "Anne of York", relation: "Daughter", dates: "1475–1511", notes: "Countess of Surrey (wife of Thomas Howard)" },
          { name: "George Plantagenet, Duke of Bedford", relation: "Son", dates: "1477–1479", notes: "Died in infancy" },
          { name: "Catherine of York", relation: "Daughter", dates: "1479–1527", notes: "Countess of Devon" },
          { name: "Bridget of York", relation: "Daughter", dates: "1480–1517", notes: "Dominican nun at Dartford Priory" }
        ]
      }
    ],
    otherChildren: [
      { name: "Arthur Plantagenet, 1st Viscount Lisle", relation: "Son (acknowledged)", dates: "c. 1460s–1542", notes: "Lord Deputy of Calais" }
    ]
  },

  // 17. Edward V
  17: {
    monarchId: 17,
    parents: {
      father: { name: "Edward IV", relation: "Father", notes: "King of England (1461–1470, 1471–1483)", monarchId: 16, isMonarch: true },
      mother: { name: "Elizabeth Woodville", relation: "Mother", notes: "Queen consort of England" }
    },
    spouses: [],
    notes: "One of the 'Princes in the Tower'. Never crowned, deposed after 78 days when declared illegitimate, and presumed murdered in the Tower of London in 1483 at age 12."
  },

  // 18. Richard III
  18: {
    monarchId: 18,
    parents: {
      father: { name: "Richard, 3rd Duke of York", relation: "Father", notes: "Yorkist leader; killed at Wakefield" },
      mother: { name: "Cecily Neville", relation: "Mother", notes: "Duchess of York" }
    },
    spouses: [
      {
        spouse: { name: "Anne Neville", relation: "Spouse", dates: "1456–1485", notes: "Daughter of Warwick 'The Kingmaker'; crowned Queen consort 1483" },
        marriageDate: "m. 1472",
        children: [
          { name: "Edward of Middleham, Prince of Wales", relation: "Son", dates: "c. 1473–1484", notes: "Only legitimate child; died suddenly at Middleham Castle in 1484" }
        ]
      }
    ],
    otherChildren: [
      { name: "John of Gloucester", relation: "Son (acknowledged)", dates: "c. 1468–1499", notes: "Captain of Calais; executed under Henry VII" },
      { name: "Katherine Plantagenet", relation: "Daughter (acknowledged)", dates: "c. 1468–1487", notes: "Married William Herbert, 2nd Earl of Pembroke" }
    ],
    notes: "Richard III was the last Plantagenet king. He was killed at the Battle of Bosworth Field in 1485, ending the Wars of the Roses."
  },

  // 19. Henry VII
  19: {
    monarchId: 19,
    parents: {
      father: { name: "Edmund Tudor, 1st Earl of Richmond", relation: "Father", notes: "Half-brother of Henry VI" },
      mother: { name: "Lady Margaret Beaufort", relation: "Mother", notes: "Great-granddaughter of John of Gaunt; key Tudor matriarch" }
    },
    spouses: [
      {
        spouse: { name: "Elizabeth of York", relation: "Spouse", dates: "1466–1503", notes: "Daughter of Edward IV; marriage united the houses of Lancaster and York" },
        marriageDate: "m. 1486",
        children: [
          { name: "Arthur, Prince of Wales", relation: "Son", dates: "1486–1502", notes: "Heir apparent; first husband of Catherine of Aragon; died aged 15" },
          { name: "Margaret Tudor", relation: "Daughter", dates: "1489–1541", notes: "Queen of Scots; ancestor of James VI and I" },
          { name: "Henry VIII", relation: "Son", dates: "1491–1547", notes: "King of England (1509–1547)", monarchId: 20, isMonarch: true },
          { name: "Elizabeth Tudor", relation: "Daughter", dates: "1492–1495", notes: "Died in childhood" },
          { name: "Mary Tudor", relation: "Daughter", dates: "1496–1533", notes: "Queen of France (wife of Louis XII) and Duchess of Suffolk" },
          { name: "Edmund Tudor, Duke of Somerset", relation: "Son", dates: "1499–1500", notes: "Died in infancy" },
          { name: "Katherine Tudor", relation: "Daughter", dates: "1503", notes: "Died shortly after birth; Queen Elizabeth died in childbed" }
        ]
      }
    ]
  },

  // 20. Henry VIII
  20: {
    monarchId: 20,
    parents: {
      father: { name: "Henry VII", relation: "Father", notes: "First Tudor King (1485–1509)", monarchId: 19, isMonarch: true },
      mother: { name: "Elizabeth of York", relation: "Mother", notes: "Daughter of Edward IV" }
    },
    spouses: [
      {
        spouse: { name: "Catherine of Aragon", relation: "1st Wife", dates: "1485–1536", notes: "Spanish princess; daughter of Ferdinand and Isabella; annulled 1533" },
        marriageDate: "m. 1509 (annulled 1533)",
        children: [
          { name: "Henry, Duke of Cornwall", relation: "Son", dates: "1511", notes: "Died aged 52 days; celebrated with elaborate jousts" },
          { name: "Mary I", relation: "Daughter", dates: "1516–1558", notes: "Queen of England (1553–1558)", monarchId: 22, isMonarch: true }
        ]
      },
      {
        spouse: { name: "Anne Boleyn", relation: "2nd Wife", dates: "c. 1501–1536", notes: "Marquess of Pembroke; crowned Queen 1533; executed at the Tower of London 1536" },
        marriageDate: "m. 1533 (executed 1536)",
        children: [
          { name: "Elizabeth I", relation: "Daughter", dates: "1533–1603", notes: "Queen of England (1558–1603); 'The Virgin Queen'", monarchId: 23, isMonarch: true }
        ]
      },
      {
        spouse: { name: "Jane Seymour", relation: "3rd Wife", dates: "c. 1508–1537", notes: "Gave birth to Henry's coveted male heir; died 12 days after birth" },
        marriageDate: "m. 1536 (died 1537)",
        children: [
          { name: "Edward VI", relation: "Son", dates: "1537–1553", notes: "King of England (1547–1553)", monarchId: 21, isMonarch: true }
        ]
      },
      {
        spouse: { name: "Anne of Cleves", relation: "4th Wife", dates: "1515–1557", notes: "German princess; marriage unconsummated and annulled; named 'King's Beloved Sister'" },
        marriageDate: "m. Jan 1540 (annulled Jul 1540)",
        children: []
      },
      {
        spouse: { name: "Catherine Howard", relation: "5th Wife", dates: "c. 1523–1542", notes: "Cousin of Anne Boleyn; stripped of queenly title and executed 1542" },
        marriageDate: "m. 1540 (executed 1542)",
        children: []
      },
      {
        spouse: { name: "Catherine Parr", relation: "6th Wife", dates: "1512–1548", notes: "Scholarly and influential reformer; survived Henry VIII" },
        marriageDate: "m. 1543 (survived Henry)",
        children: []
      }
    ],
    otherChildren: [
      { name: "Henry FitzRoy, 1st Duke of Richmond and Somerset", relation: "Son (acknowledged)", dates: "1519–1536", notes: "With Elizabeth Blount; only acknowledged illegitimate child" }
    ],
    notes: "Henry VIII's six marriages resulted in three children who each reigned as monarch: Edward VI, Mary I, and Elizabeth I."
  },

  // 21. Edward VI
  21: {
    monarchId: 21,
    parents: {
      father: { name: "Henry VIII", relation: "Father", notes: "King of England (1509–1547)", monarchId: 20, isMonarch: true },
      mother: { name: "Jane Seymour", relation: "Mother", notes: "3rd wife of Henry VIII" }
    },
    spouses: [],
    notes: "Crowned at age nine. Edward VI died of tuberculosis at age 15 in 1553; never married and had no children."
  },

  // 22. Mary I
  22: {
    monarchId: 22,
    parents: {
      father: { name: "Henry VIII", relation: "Father", notes: "King of England (1509–1547)", monarchId: 20, isMonarch: true },
      mother: { name: "Catherine of Aragon", relation: "Mother", notes: "1st wife of Henry VIII" }
    },
    spouses: [
      {
        spouse: { name: "Philip II of Spain", relation: "Spouse", dates: "1527–1598", notes: "King of England jure uxoris during Mary's reign; later King of Spain" },
        marriageDate: "m. 1554",
        children: []
      }
    ],
    notes: "Mary I suffered two celebrated phantom pregnancies. She died childless in 1558, and the crown passed to her half-sister Elizabeth I."
  },

  // 23. Elizabeth I
  23: {
    monarchId: 23,
    parents: {
      father: { name: "Henry VIII", relation: "Father", notes: "King of England (1509–1547)", monarchId: 20, isMonarch: true },
      mother: { name: "Anne Boleyn", relation: "Mother", notes: "2nd wife of Henry VIII" }
    },
    spouses: [],
    notes: "Famed as 'The Virgin Queen' (or 'Gloriana'). She never married and had no children, declaring herself wedded to the realm of England."
  },

  // 24. James I
  24: {
    monarchId: 24,
    parents: {
      father: { name: "Henry Stuart, Lord Darnley", relation: "Father", notes: "King consort of Scotland; murdered at Kirk o' Field in 1567" },
      mother: { name: "Mary, Queen of Scots", relation: "Mother", notes: "Great-granddaughter of Henry VII" }
    },
    spouses: [
      {
        spouse: { name: "Anne of Denmark", relation: "Spouse", dates: "1574–1619", notes: "Daughter of Frederick II of Denmark; Queen consort of Scotland & England" },
        marriageDate: "m. 1589",
        children: [
          { name: "Henry Frederick, Prince of Wales", relation: "Son", dates: "1594–1612", notes: "Greatly admired heir; died of typhoid fever aged 18" },
          { name: "Elizabeth Stuart ('The Winter Queen')", relation: "Daughter", dates: "1596–1662", notes: "Electress Palatine and Queen of Bohemia; grandmother of King George I" },
          { name: "Margaret Stuart", relation: "Daughter", dates: "1598–1600", notes: "Died in childhood in Scotland" },
          { name: "Charles I", relation: "Son", dates: "1600–1649", notes: "King of England, Scotland & Ireland (1625–1649)", monarchId: 25, isMonarch: true },
          { name: "Robert Stuart, Duke of Kintyre", relation: "Son", dates: "1602", notes: "Died in infancy" },
          { name: "Mary Stuart", relation: "Daughter", dates: "1605–1607", notes: "First child born to James after taking English throne; died in infancy" },
          { name: "Sophia Stuart", relation: "Daughter", dates: "1606", notes: "Died aged one day" }
        ]
      }
    ]
  },

  // 25. Charles I
  25: {
    monarchId: 25,
    parents: {
      father: { name: "James I", relation: "Father", notes: "King of England & Scotland (1603–1625)", monarchId: 24, isMonarch: true },
      mother: { name: "Anne of Denmark", relation: "Mother", notes: "Queen consort" }
    },
    spouses: [
      {
        spouse: { name: "Henrietta Maria of France", relation: "Spouse", dates: "1609–1669", notes: "Daughter of Henry IV of France; Queen consort of England" },
        marriageDate: "m. 1625",
        children: [
          { name: "Charles James, Duke of Cornwall", relation: "Son", dates: "1629", notes: "Born prematurely; died same day" },
          { name: "Charles II", relation: "Son", dates: "1630–1685", notes: "King of England, Scotland & Ireland (1660–1685)", monarchId: 26, isMonarch: true },
          { name: "Mary, Princess Royal", relation: "Daughter", dates: "1631–1660", notes: "Princess of Orange; mother of King William III" },
          { name: "James II", relation: "Son", dates: "1633–1701", notes: "King of England, Scotland & Ireland (1685–1688)", monarchId: 27, isMonarch: true },
          { name: "Elizabeth Stuart", relation: "Daughter", dates: "1635–1650", notes: "Imprisoned by Parliament during Civil War; died at Carisbrooke Castle aged 14" },
          { name: "Anne Stuart", relation: "Daughter", dates: "1637–1640", notes: "Died in early childhood" },
          { name: "Henry Stuart, Duke of Gloucester", relation: "Son", dates: "1640–1660", notes: "Died of smallpox shortly after the Restoration" },
          { name: "Henrietta of England", relation: "Daughter", dates: "1644–1670", notes: "Duchess of Orléans (wife of Philippe I, Duke of Orléans)" }
        ]
      }
    ]
  },

  // 26. Charles II
  26: {
    monarchId: 26,
    parents: {
      father: { name: "Charles I", relation: "Father", notes: "King of England (1625–1649)", monarchId: 25, isMonarch: true },
      mother: { name: "Henrietta Maria of France", relation: "Mother", notes: "Queen consort" }
    },
    spouses: [
      {
        spouse: { name: "Catherine of Braganza", relation: "Spouse", dates: "1638–1705", notes: "Portuguese infanta; brought Bombay and Tangier as dowry" },
        marriageDate: "m. 1662",
        children: []
      }
    ],
    otherChildren: [
      { name: "James Scott, 1st Duke of Monmouth", relation: "Son (acknowledged)", dates: "1649–1685", notes: "Led the Monmouth Rebellion in 1685; executed" },
      { name: "Charlotte FitzRoy, Countess of Yarmouth", relation: "Daughter (acknowledged)", dates: "1650–1684", notes: "Daughter of Elizabeth Killigrew" },
      { name: "Charles FitzCharles, 1st Earl of Plymouth", relation: "Son (acknowledged)", dates: "1657–1680", notes: "Military commander; died at Siege of Tangier" },
      { name: "Charles FitzRoy, 2nd Duke of Cleveland", relation: "Son (acknowledged)", dates: "1662–1730", notes: "Son of Barbara Palmer, 1st Duchess of Cleveland" },
      { name: "Henry FitzRoy, 1st Duke of Grafton", relation: "Son (acknowledged)", dates: "1663–1690", notes: "Vice-Admiral of England; ancestor of Diana, Princess of Wales" },
      { name: "Charlotte Lee, Countess of Lichfield", relation: "Daughter (acknowledged)", dates: "1664–1718", notes: "Daughter of Barbara Palmer" },
      { name: "Charles Beauclerk, 1st Duke of St Albans", relation: "Son (acknowledged)", dates: "1670–1726", notes: "Son of famous actress Nell Gwyn" },
      { name: "Charles Lennox, 1st Duke of Richmond", relation: "Son (acknowledged)", dates: "1672–1723", notes: "Son of Louise de Kérouaille, Duchess of Portsmouth" }
    ],
    notes: "Queen Catherine had multiple miscarriages and bore no surviving children. Charles II fathered at least 14 illegitimate children with various mistresses, but none could inherit the crown, so the throne passed to his brother James II."
  },

  // 27. James II
  27: {
    monarchId: 27,
    parents: {
      father: { name: "Charles I", relation: "Father", notes: "King of England (1625–1649)", monarchId: 25, isMonarch: true },
      mother: { name: "Henrietta Maria of France", relation: "Mother", notes: "Queen consort" }
    },
    spouses: [
      {
        spouse: { name: "Anne Hyde", relation: "1st Wife", dates: "1637–1671", notes: "Daughter of Edward Hyde, 1st Earl of Clarendon; died before James ascended throne" },
        marriageDate: "m. 1660",
        children: [
          { name: "Mary II", relation: "Daughter", dates: "1662–1694", notes: "Queen of England, Scotland & Ireland (1689–1694)", monarchId: 28, isMonarch: true },
          { name: "Anne", relation: "Daughter", dates: "1665–1714", notes: "Queen of Great Britain (1702–1714)", monarchId: 29, isMonarch: true },
          { name: "Charles, Duke of Cambridge", relation: "Son", dates: "1660–1661", notes: "Died in infancy" },
          { name: "James, Duke of Cambridge", relation: "Son", dates: "1663–1667", notes: "Died in early childhood" },
          { name: "Edgar, Duke of Cambridge", relation: "Son", dates: "1667–1671", notes: "Died in early childhood" },
          { name: "Henrietta Stuart", relation: "Daughter", dates: "1669", notes: "Died in infancy" },
          { name: "Katherine Stuart", relation: "Daughter", dates: "1671", notes: "Died in infancy" }
        ]
      },
      {
        spouse: { name: "Mary of Modena", relation: "2nd Wife", dates: "1658–1718", notes: "Italian Catholic princess; birth of her son triggered the Glorious Revolution of 1688" },
        marriageDate: "m. 1673",
        children: [
          { name: "James Francis Edward Stuart ('The Old Pretender')", relation: "Son", dates: "1688–1766", notes: "Prince of Wales; Jacobite claimant to the throne" },
          { name: "Louisa Maria Stuart", relation: "Daughter", dates: "1692–1712", notes: "Born in exile at Saint-Germain-en-Laye" },
          { name: "Catherine Laura, Isabella, Charles, Charlotte", relation: "Children", dates: "1675–1682", notes: "Four children who each died in infancy" }
        ]
      }
    ],
    otherChildren: [
      { name: "James FitzJames, 1st Duke of Berwick", relation: "Son (acknowledged)", dates: "1670–1734", notes: "Marshal of France and military commander; son of Arabella Churchill" },
      { name: "Henrietta FitzJames", relation: "Daughter (acknowledged)", dates: "1667–1730", notes: "Viscountess Galmoye" }
    ]
  },

  // 28. William III & Mary II
  28: {
    monarchId: 28,
    parents: {
      father: { name: "William II, Prince of Orange & James II (Father-in-law)", relation: "Parents", notes: "William was son of William II & Mary Princess Royal; Mary was daughter of James II" },
      mother: { name: "Mary, Princess Royal & Anne Hyde", relation: "Mothers", notes: "William III and Mary II were first cousins" }
    },
    spouses: [
      {
        spouse: { name: "Joint Monarchs: William III & Mary II", relation: "Co-Monarchs", dates: "1650–1702 / 1662–1694", notes: "Married in 1677; invited by Parliament to rule as joint sovereigns in 1689" },
        marriageDate: "m. 1677",
        children: []
      }
    ],
    notes: "William and Mary had no surviving children; Mary suffered several miscarriages. When Mary died in 1694, William ruled alone until his death in 1702, whereupon Mary's sister Anne succeeded."
  },

  // 29. Anne
  29: {
    monarchId: 29,
    parents: {
      father: { name: "James II", relation: "Father", notes: "King of England (1685–1688)", monarchId: 27, isMonarch: true },
      mother: { name: "Anne Hyde", relation: "Mother", notes: "Duchess of York" }
    },
    spouses: [
      {
        spouse: { name: "Prince George of Denmark", relation: "Spouse", dates: "1653–1708", notes: "Duke of Cumberland; Lord High Admiral" },
        marriageDate: "m. 1683",
        children: [
          { name: "Prince William, Duke of Gloucester", relation: "Son", dates: "1689–1700", notes: "Only child to survive infancy; died of fever at age 11" },
          { name: "Mary of Denmark", relation: "Daughter", dates: "1685–1687", notes: "Died of smallpox in infancy" },
          { name: "Anne Sophia", relation: "Daughter", dates: "1686–1687", notes: "Died of smallpox in infancy" }
        ]
      }
    ],
    notes: "Queen Anne endured 17 pregnancies, but tragically none of her children survived to adulthood. Her son William died in 1700, leading Parliament to pass the Act of Settlement 1701 settling the crown on Sophia of Hanover and her Protestant heirs."
  },

  // 30. George I
  30: {
    monarchId: 30,
    parents: {
      father: { name: "Ernest Augustus", relation: "Father", notes: "Elector of Hanover" },
      mother: { name: "Sophia of Hanover", relation: "Mother", notes: "Granddaughter of James I; heiress to British throne under Act of Settlement" }
    },
    spouses: [
      {
        spouse: { name: "Sophia Dorothea of Celle", relation: "Spouse", dates: "1666–1726", notes: "Imprisoned for 32 years at Ahlden Castle following an alleged affair; divorced 1694" },
        marriageDate: "m. 1682 (divorced 1694)",
        children: [
          { name: "George II", relation: "Son", dates: "1683–1760", notes: "King of Great Britain (1727–1760)", monarchId: 31, isMonarch: true },
          { name: "Sophia Dorothea of Hanover", relation: "Daughter", dates: "1687–1757", notes: "Queen in Prussia; mother of Frederick the Great" }
        ]
      }
    ]
  },

  // 31. George II
  31: {
    monarchId: 31,
    parents: {
      father: { name: "George I", relation: "Father", notes: "King of Great Britain (1714–1727)", monarchId: 30, isMonarch: true },
      mother: { name: "Sophia Dorothea of Celle", relation: "Mother", notes: "Princess of Celle" }
    },
    spouses: [
      {
        spouse: { name: "Caroline of Ansbach", relation: "Spouse", dates: "1683–1737", notes: "Queen consort of Great Britain; intellectual and close political partner to Robert Walpole" },
        marriageDate: "m. 1705",
        children: [
          { name: "Frederick, Prince of Wales", relation: "Son", dates: "1707–1751", notes: "Heir apparent; father of King George III; predeceased his father" },
          { name: "Anne, Princess Royal", relation: "Daughter", dates: "1709–1759", notes: "Princess of Orange (wife of William IV, Prince of Orange)" },
          { name: "Princess Amelia of Great Britain", relation: "Daughter", dates: "1711–1786", notes: "Ranger of Richmond Park" },
          { name: "Princess Caroline of Great Britain", relation: "Daughter", dates: "1713–1757", notes: "Devoted companion to her mother" },
          { name: "Prince George William", relation: "Son", dates: "1717–1718", notes: "Died in infancy" },
          { name: "Prince William, Duke of Cumberland", relation: "Son", dates: "1721–1765", notes: "Commander at Battle of Culloden (1746)" },
          { name: "Princess Mary of Great Britain", relation: "Daughter", dates: "1723–1772", notes: "Landgravine of Hesse-Kassel" },
          { name: "Princess Louise of Great Britain", relation: "Daughter", dates: "1724–1751", notes: "Queen of Denmark and Norway (wife of Frederick V)" }
        ]
      }
    ]
  },

  // 32. George III
  32: {
    monarchId: 32,
    parents: {
      father: { name: "Frederick, Prince of Wales", relation: "Father", notes: "Eldest son of George II; died 1751" },
      mother: { name: "Princess Augusta of Saxe-Gotha", relation: "Mother", notes: "Princess of Wales" }
    },
    spouses: [
      {
        spouse: { name: "Charlotte of Mecklenburg-Strelitz", relation: "Spouse", dates: "1744–1818", notes: "Queen consort of the United Kingdom; keen botanist who helped expand Kew Gardens" },
        marriageDate: "m. 1761",
        children: [
          { name: "George IV", relation: "Son", dates: "1762–1830", notes: "King of the United Kingdom (1820–1830); Prince Regent from 1811", monarchId: 33, isMonarch: true },
          { name: "Prince Frederick, Duke of York and Albany", relation: "Son", dates: "1763–1827", notes: "Commander-in-Chief of the British Army; 'The Grand Old Duke of York'" },
          { name: "William IV", relation: "Son", dates: "1765–1837", notes: "King of the United Kingdom (1830–1837); 'The Sailor King'", monarchId: 34, isMonarch: true },
          { name: "Charlotte, Princess Royal", relation: "Daughter", dates: "1766–1828", notes: "Queen of Württemberg (wife of Frederick I)" },
          { name: "Prince Edward, Duke of Kent and Strathearn", relation: "Son", dates: "1767–1820", notes: "Father of Queen Victoria" },
          { name: "Princess Augusta Sophia", relation: "Daughter", dates: "1768–1840", notes: "Unmarried; lived at Frogmore House" },
          { name: "Princess Elizabeth", relation: "Daughter", dates: "1770–1840", notes: "Landgravine of Hesse-Homburg" },
          { name: "Ernest Augustus, King of Hanover", relation: "Son", dates: "1771–1851", notes: "Duke of Cumberland; became King of Hanover in 1837" },
          { name: "Prince Augustus Frederick, Duke of Sussex", relation: "Son", dates: "1773–1843", notes: "President of the Royal Society; liberal reformer" },
          { name: "Prince Adolphus, Duke of Cambridge", relation: "Son", dates: "1774–1850", notes: "Viceroy of Hanover; grandfather of Queen Mary" },
          { name: "Princess Mary", relation: "Daughter", dates: "1776–1857", notes: "Duchess of Gloucester and Edinburgh" },
          { name: "Princess Sophia", relation: "Daughter", dates: "1777–1848", notes: "Companion to Queen Charlotte" },
          { name: "Prince Octavius", relation: "Son", dates: "1779–1783", notes: "Died of smallpox inoculation aged four" },
          { name: "Prince Alfred", relation: "Son", dates: "1780–1782", notes: "Died aged nearly two" },
          { name: "Princess Amelia", relation: "Daughter", dates: "1783–1810", notes: "Youngest child; her death in 1810 precipitated George III's final mental illness" }
        ]
      }
    ],
    notes: "George III and Queen Charlotte had 15 children, 13 of whom survived to adulthood — one of the largest royal families in British history."
  },

  // 33. George IV
  33: {
    monarchId: 33,
    parents: {
      father: { name: "George III", relation: "Father", notes: "King of the United Kingdom (1760–1820)", monarchId: 32, isMonarch: true },
      mother: { name: "Charlotte of Mecklenburg-Strelitz", relation: "Mother", notes: "Queen consort" }
    },
    spouses: [
      {
        spouse: { name: "Maria Fitzherbert", relation: "Secret Wife", dates: "1756–1837", notes: "Secretly married in 1785; marriage was legally invalid under the Royal Marriages Act 1772" },
        marriageDate: "m. 1785 (uncanonical)",
        children: []
      },
      {
        spouse: { name: "Caroline of Brunswick", relation: "Official Spouse", dates: "1768–1821", notes: "Queen consort; estranged immediately after marriage; barred from George IV's coronation" },
        marriageDate: "m. 1795",
        children: [
          { name: "Princess Charlotte of Wales", relation: "Daughter", dates: "1796–1817", notes: "Sole legitimate grandchild of George III at the time; tragically died in childbirth aged 21" }
        ]
      }
    ],
    notes: "The death of Princess Charlotte in 1817 plunged the nation into deep mourning and triggered a succession race among George III's bachelor sons."
  },

  // 34. William IV
  34: {
    monarchId: 34,
    parents: {
      father: { name: "George III", relation: "Father", notes: "King of the United Kingdom (1760–1820)", monarchId: 32, isMonarch: true },
      mother: { name: "Charlotte of Mecklenburg-Strelitz", relation: "Mother", notes: "Queen consort" }
    },
    spouses: [
      {
        spouse: { name: "Adelaide of Saxe-Meiningen", relation: "Spouse", dates: "1792–1849", notes: "Queen consort; popular for her piety and modest lifestyle; Adelaide in Australia named after her" },
        marriageDate: "m. 1818",
        children: [
          { name: "Princess Charlotte of Clarence", relation: "Daughter", dates: "1819", notes: "Died on the day of her birth" },
          { name: "Princess Elizabeth of Clarence", relation: "Daughter", dates: "1820–1821", notes: "Died aged four months" }
        ]
      }
    ],
    otherChildren: [
      { name: "George FitzClarence, 1st Earl of Munster", relation: "Son (acknowledged)", dates: "1794–1842", notes: "Eldest son with comedic actress Dorothea Jordan" },
      { name: "Sophia FitzClarence, Baroness De L'Isle and Dudley", relation: "Daughter (acknowledged)", dates: "1795–1837", notes: "State housekeeper at Kensington Palace" },
      { name: "Henry FitzClarence", relation: "Son (acknowledged)", dates: "1797–1817", notes: "Midshipman in the Royal Navy" },
      { name: "Lady Mary Fox", relation: "Daughter (acknowledged)", dates: "1798–1864", notes: "Housekeeper at Windsor Castle" },
      { name: "Lord Frederick FitzClarence", relation: "Son (acknowledged)", dates: "1799–1854", notes: "Lieutenant-General in the British Army" },
      { name: "Elizabeth Hay, Countess of Erroll", relation: "Daughter (acknowledged)", dates: "1801–1856", notes: "Wife of William Hay, 18th Earl of Erroll" },
      { name: "Lord Adolphus FitzClarence", relation: "Son (acknowledged)", dates: "1802–1856", notes: "Rear-Admiral in Royal Navy; captain of Royal Yacht" },
      { name: "Lady Augusta Gordon", relation: "Daughter (acknowledged)", dates: "1803–1865", notes: "Housekeeper at Kensington Palace" },
      { name: "Lord Augustus FitzClarence", relation: "Son (acknowledged)", dates: "1805–1854", notes: "Rector of Mapledurham" },
      { name: "Amelia Cary, Viscountess Falkland", relation: "Daughter (acknowledged)", dates: "1807–1858", notes: "Youngest child with Dorothea Jordan" }
    ],
    notes: "William IV had no surviving legitimate children with Queen Adelaide. On his death in 1837, the throne passed to his niece, Victoria, daughter of his deceased brother Prince Edward."
  },

  // 35. Victoria
  35: {
    monarchId: 35,
    parents: {
      father: { name: "Prince Edward, Duke of Kent and Strathearn", relation: "Father", notes: "4th son of George III; died 1820" },
      mother: { name: "Princess Victoria of Saxe-Coburg-Saalfeld", relation: "Mother", notes: "Duchess of Kent" }
    },
    spouses: [
      {
        spouse: { name: "Prince Albert of Saxe-Coburg and Gotha", relation: "Prince Consort", dates: "1819–1861", notes: "Influential advisor, patron of Great Exhibition 1851; Victoria mourned him for 40 years" },
        marriageDate: "m. 1840",
        children: [
          { name: "Victoria, Princess Royal", relation: "Daughter", dates: "1840–1901", notes: "German Empress & Queen of Prussia; mother of Kaiser Wilhelm II" },
          { name: "Edward VII", relation: "Son", dates: "1841–1910", notes: "King of the United Kingdom (1901–1910)", monarchId: 36, isMonarch: true },
          { name: "Princess Alice", relation: "Daughter", dates: "1843–1878", notes: "Grand Duchess of Hesse; mother of Tsarina Alexandra of Russia" },
          { name: "Prince Alfred, Duke of Saxe-Coburg and Gotha", relation: "Son", dates: "1844–1900", notes: "Duke of Edinburgh; Admiral of the Fleet" },
          { name: "Princess Helena", relation: "Daughter", dates: "1846–1923", notes: "Princess Christian of Schleswig-Holstein; founding member of Red Cross" },
          { name: "Princess Louise", relation: "Daughter", dates: "1848–1939", notes: "Duchess of Argyll; talented sculptor (carved Victoria's statue at Kensington Palace)" },
          { name: "Prince Arthur, Duke of Connaught and Strathearn", relation: "Son", dates: "1850–1942", notes: "Governor General of Canada; Field Marshal" },
          { name: "Prince Leopold, Duke of Albany", relation: "Son", dates: "1853–1884", notes: "Suffered from haemophilia; died aged 30" },
          { name: "Princess Beatrice", relation: "Daughter", dates: "1857–1944", notes: "Princess Henry of Battenberg; Victoria's lifelong companion and editor of her journals" }
        ]
      }
    ],
    notes: "Known as the 'Grandmother of Europe', Victoria's nine children and 42 grandchildren married into royal families across the continent."
  },

  // 36. Edward VII
  36: {
    monarchId: 36,
    parents: {
      father: { name: "Prince Albert of Saxe-Coburg and Gotha", relation: "Father", notes: "Prince Consort" },
      mother: { name: "Queen Victoria", relation: "Mother", notes: "Queen of the United Kingdom (1837–1901)", monarchId: 35, isMonarch: true }
    },
    spouses: [
      {
        spouse: { name: "Alexandra of Denmark", relation: "Spouse", dates: "1844–1925", notes: "Daughter of Christian IX of Denmark; beloved Queen consort" },
        marriageDate: "m. 1863",
        children: [
          { name: "Prince Albert Victor, Duke of Clarence and Avondale", relation: "Son", dates: "1864–1892", notes: "Heir presumptive; died of pneumonia aged 28" },
          { name: "George V", relation: "Son", dates: "1865–1936", notes: "King of the United Kingdom (1910–1936)", monarchId: 37, isMonarch: true },
          { name: "Louise, Princess Royal", relation: "Daughter", dates: "1867–1931", notes: "Duchess of Fife" },
          { name: "Princess Victoria", relation: "Daughter", dates: "1868–1935", notes: "Unmarried; lifelong companion to Queen Alexandra" },
          { name: "Maud of Wales", relation: "Daughter", dates: "1869–1938", notes: "Queen consort of Norway (wife of King Haakon VII)" },
          { name: "Prince Alexander John", relation: "Son", dates: "1871", notes: "Died the day after birth" }
        ]
      }
    ]
  },

  // 37. George V
  37: {
    monarchId: 37,
    parents: {
      father: { name: "Edward VII", relation: "Father", notes: "King of the United Kingdom (1901–1910)", monarchId: 36, isMonarch: true },
      mother: { name: "Alexandra of Denmark", relation: "Mother", notes: "Queen consort" }
    },
    spouses: [
      {
        spouse: { name: "Mary of Teck", relation: "Spouse", dates: "1867–1953", notes: "Queen consort; originally betrothed to Prince Albert Victor; steadfast royal matriarch" },
        marriageDate: "m. 1893",
        children: [
          { name: "Edward VIII", relation: "Son", dates: "1894–1972", notes: "King of the United Kingdom (1936); Duke of Windsor", monarchId: 38, isMonarch: true },
          { name: "George VI", relation: "Son", dates: "1895–1952", notes: "King of the United Kingdom (1936–1952); wartime monarch", monarchId: 39, isMonarch: true },
          { name: "Mary, Princess Royal", relation: "Daughter", dates: "1897–1965", notes: "Countess of Harewood; chief controller of ATS" },
          { name: "Prince Henry, Duke of Gloucester", relation: "Son", dates: "1900–1974", notes: "Governor-General of Australia; soldier" },
          { name: "Prince George, Duke of Kent", relation: "Son", dates: "1902–1942", notes: "RAF Air Commodore; killed on active service in flying crash" },
          { name: "Prince John", relation: "Son", dates: "1905–1919", notes: "Suffered from severe epilepsy; lived at Wood Farm, Sandringham; died aged 13" }
        ]
      }
    ],
    notes: "In 1917, during World War I, George V relinquished all German titles and changed the family's royal house name from Saxe-Coburg and Gotha to Windsor."
  },

  // 38. Edward VIII
  38: {
    monarchId: 38,
    parents: {
      father: { name: "George V", relation: "Father", notes: "King of the United Kingdom (1910–1936)", monarchId: 37, isMonarch: true },
      mother: { name: "Mary of Teck", relation: "Mother", notes: "Queen consort" }
    },
    spouses: [
      {
        spouse: { name: "Wallis Simpson", relation: "Spouse", dates: "1896–1986", notes: "Duchess of Windsor; American socialite whose divorce sparked the 1936 Abdication Crisis" },
        marriageDate: "m. 1937",
        children: []
      }
    ],
    notes: "Edward VIII abdicated in December 1936 after a reign of only 326 days in order to marry Wallis Simpson. They lived in exile in France and had no children."
  },

  // 39. George VI
  39: {
    monarchId: 39,
    parents: {
      father: { name: "George V", relation: "Father", notes: "King of the United Kingdom (1910–1936)", monarchId: 37, isMonarch: true },
      mother: { name: "Mary of Teck", relation: "Mother", notes: "Queen consort" }
    },
    spouses: [
      {
        spouse: { name: "Elizabeth Bowes-Lyon", relation: "Spouse", dates: "1900–2002", notes: "Queen consort; later 'Queen Elizabeth The Queen Mother'; beloved symbol of British resilience" },
        marriageDate: "m. 1923",
        children: [
          { name: "Elizabeth II", relation: "Daughter", dates: "1926–2022", notes: "Queen of the United Kingdom (1952–2022); longest-reigning British monarch", monarchId: 40, isMonarch: true },
          { name: "Princess Margaret, Countess of Snowdon", relation: "Daughter", dates: "1930–2002", notes: "Popular style icon; married photographer Antony Armstrong-Jones" }
        ]
      }
    ]
  },

  // 40. Elizabeth II
  40: {
    monarchId: 40,
    parents: {
      father: { name: "George VI", relation: "Father", notes: "King of the United Kingdom (1936–1952)", monarchId: 39, isMonarch: true },
      mother: { name: "Elizabeth Bowes-Lyon", relation: "Mother", notes: "Queen Elizabeth The Queen Mother" }
    },
    spouses: [
      {
        spouse: { name: "Prince Philip, Duke of Edinburgh", relation: "Prince Consort", dates: "1921–2021", notes: "Born Prince Philip of Greece and Denmark; Queen's 'strength and stay' during 73 years of marriage" },
        marriageDate: "m. 1947",
        children: [
          { name: "Charles III", relation: "Son", dates: "b. 1948", notes: "King of the United Kingdom (2022–present)", monarchId: 41, isMonarch: true },
          { name: "Anne, Princess Royal", relation: "Daughter", dates: "b. 1950", notes: "Olympic equestrian and one of the hardest-working working royals" },
          { name: "Prince Andrew, Duke of York", relation: "Son", dates: "b. 1960", notes: "Falklands War helicopter pilot; stepped back from public duties in 2019" },
          { name: "Prince Edward, Duke of Edinburgh", relation: "Son", dates: "b. 1964", notes: "Earl of Wessex & Duke of Edinburgh; patron of Duke of Edinburgh's Award" }
        ]
      }
    ]
  },

  // 41. Charles III
  41: {
    monarchId: 41,
    parents: {
      father: { name: "Prince Philip, Duke of Edinburgh", relation: "Father", notes: "Consort of Queen Elizabeth II" },
      mother: { name: "Queen Elizabeth II", relation: "Mother", notes: "Queen of the United Kingdom (1952–2022)", monarchId: 40, isMonarch: true }
    },
    spouses: [
      {
        spouse: { name: "Lady Diana Spencer", relation: "1st Wife", dates: "1961–1997", notes: "Princess of Wales; 'The People's Princess'; global humanitarian icon; divorced 1996" },
        marriageDate: "m. 1981 (divorced 1996)",
        children: [
          { name: "Prince William, Prince of Wales", relation: "Son", dates: "b. 1982", notes: "Duke of Cambridge; Heir apparent to the British throne" },
          { name: "Prince Harry, Duke of Sussex", relation: "Son", dates: "b. 1984", notes: "Founder of the Invictus Games" }
        ]
      },
      {
        spouse: { name: "Camilla Parker Bowles", relation: "Queen Consort", dates: "b. 1947", notes: "Queen Camilla; crowned Queen alongside King Charles III in 2023" },
        marriageDate: "m. 2005",
        children: []
      }
    ]
  }
};

export const getMonarchFamily = (id: number): MonarchFamily | undefined => {
  return monarchFamilies[id];
};

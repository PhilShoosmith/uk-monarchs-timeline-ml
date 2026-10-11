export interface LeaderEntry {
  name: string;
  title?: string;
  years: string;
  partyOrDynasty?: string;
  note?: string;
}

export interface TenureHighlightsData {
  monarchId: number;
  monarchName: string;
  reignPeriod: string;
  reignStart: number;
  reignEnd: number | null;
  keyHighlights: string[];
  ukPrimeMinisters: LeaderEntry[];
  usPresidents: LeaderEntry[];
  frenchRulers: LeaderEntry[];
  contemporaryContext?: string;
}

export const monarchTenureHighlights: Record<number, TenureHighlightsData> = {
  // 1. William I (1066–1087)
  1: {
    monarchId: 1,
    monarchName: "William I",
    reignPeriod: "1066–1087",
    reignStart: 1066,
    reignEnd: 1087,
    keyHighlights: [
      "Led the Norman Conquest of England following the Battle of Hastings (1066).",
      "Commissioned the comprehensive Domesday Book (1086) survey of landholdings and wealth.",
      "Initiated the construction of the White Tower (Tower of London) and stone castles across England.",
      "Replaced the Anglo-Saxon aristocracy and episcopate with Norman nobility and clergy."
    ],
    contemporaryContext: "During the High Middle Ages, modern offices such as UK Prime Minister and US President did not yet exist. In France, the Capetian dynasty ruled the Kingdom of France.",
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Philip I ('the Amorous')", title: "King of France (House of Capet)", years: "1060–1108", note: "Rival to William I in Normandy and the Vexin." }
    ]
  },

  // 2. William II (1087–1100)
  2: {
    monarchId: 2,
    monarchName: "William II",
    reignPeriod: "1087–1100",
    reignStart: 1087,
    reignEnd: 1100,
    keyHighlights: [
      "Maintained firm royal control over England and Normandy against rebellious Norman barons.",
      "Constructed Westminster Hall (1097–1099), the greatest open-timbered hall in medieval Europe.",
      "Prolonged bitter dispute with Archbishop of Canterbury Anselm over church investiture rights.",
      "Killed by an arrow in mysterious circumstances while hunting in the New Forest (1100)."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Philip I", title: "King of France (House of Capet)", years: "1060–1108", note: "Continued Capetian consolidation amidst the First Crusade (1096–1099)." }
    ]
  },

  // 3. Henry I (1100–1135)
  3: {
    monarchId: 3,
    monarchName: "Henry I",
    reignPeriod: "1100–1135",
    reignStart: 1100,
    reignEnd: 1135,
    keyHighlights: [
      "Issued the Charter of Liberties (1100), a key precursor to Magna Carta promising baronial justice.",
      "Reunited England and Normandy after defeating his elder brother Robert Curthose at Tinchebray (1106).",
      "Reformed English legal and financial administration, establishing the permanent Court of Exchequer.",
      "Loss of his only legitimate son William Adelin in the White Ship disaster (1120) triggered a succession crisis."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Philip I", title: "King of France (House of Capet)", years: "1060–1108" },
      { name: "Louis VI ('the Fat')", title: "King of France (House of Capet)", years: "1108–1137", note: "Fought repeated border wars with Henry I in the Vexin and Normandy." }
    ]
  },

  // 4. Stephen (1135–1154)
  4: {
    monarchId: 4,
    monarchName: "Stephen",
    reignPeriod: "1135–1154",
    reignStart: 1135,
    reignEnd: 1154,
    keyHighlights: [
      "Usurped the throne ahead of his cousin Empress Matilda, plunging England into the civil war known as 'The Anarchy'.",
      "Captured at the Battle of Lincoln (1141) and temporarily deposed before winning release in a prisoner exchange.",
      "Treaty of Wallingford (1153) ended hostilities by recognizing Matilda's son Henry Plantagenet as his rightful heir."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Louis VI", title: "King of France (House of Capet)", years: "1108–1137" },
      { name: "Louis VII ('the Younger')", title: "King of France (House of Capet)", years: "1137–1180", note: "Married Eleanor of Aquitaine; led the Second Crusade." }
    ]
  },

  // 5. Henry II (1154–1189)
  5: {
    monarchId: 5,
    monarchName: "Henry II",
    reignPeriod: "1154–1189",
    reignStart: 1154,
    reignEnd: 1189,
    keyHighlights: [
      "Created the vast Angevin Empire spanning England, Normandy, Anjou, Maine, Touraine, and Aquitaine.",
      "Pioneered English Common Law, regularized itinerant royal judges, and instituted the trial by jury system.",
      "Infamous constitutional and religious clash with Thomas Becket culminated in Becket's murder at Canterbury (1170).",
      "Conquered parts of Ireland (1171) following the Norman invasion authorized by papal bull Laudabiliter."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Louis VII", title: "King of France (House of Capet)", years: "1137–1180", note: "Former husband of Eleanor of Aquitaine, who remarried Henry II." },
      { name: "Philip II Augustus", title: "King of France (House of Capet)", years: "1180–1223", note: "Formidable Capetian king who conspired with Henry's sons to dismantle the Angevin Empire." }
    ]
  },

  // 6. Richard I (1189–1199)
  6: {
    monarchId: 6,
    monarchName: "Richard I",
    reignPeriod: "1189–1199",
    reignStart: 1189,
    reignEnd: 1199,
    keyHighlights: [
      "Renowned military commander ('The Lionheart'); spent less than six months of his 10-year reign in England.",
      "Fought the Third Crusade (1189–1192), capturing Cyprus and Acre, and securing a truce with Saladin permitting Christian pilgrims.",
      "Captured on his journey home and ransomed by Holy Roman Emperor Henry VI for an enormous sum of 100,000 marks.",
      "Built the fortress Château Gaillard in Normandy to defend against Philip II Augustus; died from a crossbow wound at Châlus."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Philip II Augustus", title: "King of France (House of Capet)", years: "1180–1223", note: "Crusade ally turned bitter rival; conquered eastern Normandy while Richard was imprisoned." }
    ]
  },

  // 7. John (1199–1216)
  7: {
    monarchId: 7,
    monarchName: "John",
    reignPeriod: "1199–1216",
    reignStart: 1199,
    reignEnd: 1216,
    keyHighlights: [
      "Lost Normandy, Anjou, Maine, and Poitou to Philip II Augustus of France ('John Lackland' / 'Softsword').",
      "Excommunicated by Pope Innocent III (1209) in a dispute over the appointment of Stephen Langton as Archbishop.",
      "Forced by rebellious barons to grant the Magna Carta at Runnymede (June 1215), guaranteeing fundamental liberties.",
      "First Barons' War broke out when John renounced the charter, prompting barons to invite Prince Louis of France to take the crown."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Philip II Augustus", title: "King of France (House of Capet)", years: "1180–1223", note: "Decisively defeated John's allies at the Battle of Bouvines (1214)." }
    ]
  },

  // 8. Henry III (1216–1272)
  8: {
    monarchId: 8,
    monarchName: "Henry III",
    reignPeriod: "1216–1272",
    reignStart: 1216,
    reignEnd: 1272,
    keyHighlights: [
      "Crowned at age nine; reaffirmed Magna Carta and the Charter of the Forest under regents William Marshal and Hubert de Burgh.",
      "Extravagant patron of the arts who rebuilt Westminster Abbey in Gothic style as a shrine to Edward the Confessor.",
      "Provisions of Oxford (1258) forced by barons established a council of fifteen to oversee the monarch.",
      "Second Barons' War led by Simon de Montfort, who summoned the groundbreaking 1265 Parliament including burgesses."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Philip II Augustus", title: "King of France", years: "1180–1223" },
      { name: "Louis VIII ('the Lion')", title: "King of France", years: "1223–1226" },
      { name: "Louis IX ('Saint Louis')", title: "King of France", years: "1226–1270", note: "Revered pious monarch who mediated English disputes (Mise of Amiens, 1264)." },
      { name: "Philip III ('the Bold')", title: "King of France", years: "1270–1285" }
    ]
  },

  // 9. Edward I (1272–1307)
  9: {
    monarchId: 9,
    monarchName: "Edward I",
    reignPeriod: "1272–1307",
    reignStart: 1272,
    reignEnd: 1307,
    keyHighlights: [
      "Conquered Wales (1277–1283), enacted Statute of Rhuddlan, and built imposing ring of castles (Caernarfon, Conwy, Harlech).",
      "Summoned the Model Parliament of 1295, establishing knights and burgesses as regular parliamentary representatives.",
      "Campaigns in Scotland earned him the moniker 'Hammer of the Scots', sparking the Scottish Wars of Independence with William Wallace.",
      "Expelled the Jewish population from England in 1290 via the Edict of Expulsion."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Philip III", title: "King of France", years: "1270–1285" },
      { name: "Philip IV ('the Fair')", title: "King of France", years: "1285–1314", note: "Clashed over Gascony; formed the Auld Alliance with Scotland against England." }
    ]
  },

  // 10. Edward II (1307–1327)
  10: {
    monarchId: 10,
    monarchName: "Edward II",
    reignPeriod: "1307–1327",
    reignStart: 1307,
    reignEnd: 1327,
    keyHighlights: [
      "Disastrous reign alienated English barons due to intense favoritism toward Piers Gaveston and Hugh Despenser.",
      "Decisively defeated by Robert the Bruce at the Battle of Bannockburn (1314), securing Scottish independence.",
      "Deposed in 1327 by his estranged wife Queen Isabella ('She-Wolf of France') and her lover Roger Mortimer; died imprisoned at Berkeley Castle."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Philip IV ('the Fair')", title: "King of France", years: "1285–1314" },
      { name: "Louis X ('the Quarreler')", title: "King of France", years: "1314–1316" },
      { name: "John I ('the Posthumous')", title: "King of France", years: "1316 (5 days)" },
      { name: "Philip V ('the Tall')", title: "King of France", years: "1316–1322" },
      { name: "Charles IV ('the Fair')", title: "King of France", years: "1322–1328", note: "Brother of Queen Isabella; last direct Capetian King." }
    ]
  },

  // 11. Edward III (1327–1377)
  11: {
    monarchId: 11,
    monarchName: "Edward III",
    reignPeriod: "1327–1377",
    reignStart: 1327,
    reignEnd: 1377,
    keyHighlights: [
      "Claimed the French crown through his mother Isabella, sparking the Hundred Years' War in 1337.",
      "Spectacular English military victories at Crécy (1346) and Poitiers (1356, led by the Black Prince), capturing King John II of France.",
      "Founded the Order of the Garter (c. 1348), England's premier chivalric order.",
      "Reigned during the devastating Black Death (1348–1350), which killed an estimated one-third of England's population."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Charles IV", title: "King of France", years: "1322–1328" },
      { name: "Philip VI", title: "King of France (House of Valois)", years: "1328–1350", note: "First Valois king; defeated at Crécy." },
      { name: "John II ('the Good')", title: "King of France (House of Valois)", years: "1350–1364", note: "Captured at Poitiers (1356) and held in London." },
      { name: "Charles V ('the Wise')", title: "King of France (House of Valois)", years: "1364–1380", note: "Recovered most French lands ceded in Treaty of Brétigny." }
    ]
  },

  // 12. Richard II (1377–1399)
  12: {
    monarchId: 12,
    monarchName: "Richard II",
    reignPeriod: "1377–1399",
    reignStart: 1377,
    reignEnd: 1399,
    keyHighlights: [
      "Bravely confronted and diffused Wat Tyler's Peasants' Revolt at Smithfield in 1381 at age 14.",
      "Promoted high court culture, authoring the Wilton Diptych and remodeling Westminster Hall with hammer-beam roof.",
      "Authoritarian rule led to conflict with the Lords Appellant; exiled Henry Bolingbroke and confiscated his Lancastrian inheritance.",
      "Deposed in 1399 when Bolingbroke invaded; imprisoned and died at Pontefract Castle, ending the direct Plantagenet line."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Charles V ('the Wise')", title: "King of France", years: "1364–1380" },
      { name: "Charles VI ('the Mad')", title: "King of France (House of Valois)", years: "1380–1422", note: "Suffered severe mental illness; French court divided by Armagnac-Burgundian civil war." }
    ]
  },

  // 13. Henry IV (1399–1413)
  13: {
    monarchId: 13,
    monarchName: "Henry IV",
    reignPeriod: "1399–1413",
    reignStart: 1399,
    reignEnd: 1413,
    keyHighlights: [
      "First monarch of the House of Lancaster; first English king whose mother tongue was English since the Conquest.",
      "Faced persistent rebellions including Owain Glyndŵr's Welsh uprising and the Percy revolt at Shrewsbury (1403).",
      "Passed the statute De Heretico Comburendo (1401), authorizing the burning of Lollard religious dissenters.",
      "Plagued by failing health, leaving increasing governmental control to his son Prince Hal."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Charles VI", title: "King of France (House of Valois)", years: "1380–1422" }
    ]
  },

  // 14. Henry V (1413–1422)
  14: {
    monarchId: 14,
    monarchName: "Henry V",
    reignPeriod: "1413–1422",
    reignStart: 1413,
    reignEnd: 1422,
    keyHighlights: [
      "Secured an astounding victory against overwhelming French odds at the Battle of Agincourt (1415).",
      "Systematically conquered Normandy, taking Rouen after an extended siege in 1419.",
      "Signed the Treaty of Troyes (1420), marrying Catherine of Valois and being designated regent and heir to the French throne.",
      "Died suddenly of dysentery at the height of his power at Vincennes, two months before King Charles VI of France."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Charles VI", title: "King of France (House of Valois)", years: "1380–1422", note: "Recognized Henry V as his heir under the Treaty of Troyes (1420)." }
    ]
  },

  // 15. Henry VI (1422–1461, 1470–1471)
  15: {
    monarchId: 15,
    monarchName: "Henry VI",
    reignPeriod: "1422–1461",
    reignStart: 1422,
    reignEnd: 1461,
    keyHighlights: [
      "Inherited crowns of England and France in infancy (only English monarch crowned King of France in Paris, 1431).",
      "Founded Eton College (1440) and King's College, Cambridge (1441).",
      "Loss of all English lands in France except Calais by 1453 (marked by the defeat at Castillon ending the Hundred Years' War).",
      "Mental breakdowns and weak rule ignited the Wars of the Roses (Lancaster vs. York); deposed by Edward IV in 1461."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Charles VII ('the Victorious')", title: "King of France (House of Valois)", years: "1422–1461", note: "Crowned at Reims with Joan of Arc; expelled the English from all continental France except Calais." },
      { name: "Louis XI ('the Universal Spider')", title: "King of France (House of Valois)", years: "1461–1483", note: "Consolidated French monarchy and outmaneuvered Burgundy." }
    ]
  },

  // 16. Edward IV (1461–1470, 1471–1483)
  16: {
    monarchId: 16,
    monarchName: "Edward IV",
    reignPeriod: "1461–1483",
    reignStart: 1461,
    reignEnd: 1483,
    keyHighlights: [
      "First Yorkist king; claimed the throne after decisive victory at the brutal Battle of Towton (1461).",
      "Re-established Yorkist supremacy in 1471 by defeating Warwick at Barnet and Queen Margaret at Tewkesbury.",
      "Secret marriage to Elizabeth Woodville alienated allies like the Earl of Warwick ('The Kingmaker').",
      "Restored crown finances and political stability; William Caxton introduced printing to England (1476)."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Louis XI", title: "King of France (House of Valois)", years: "1461–1483", note: "Signed the Treaty of Picquigny (1475) with Edward IV, paying an annual English pension." }
    ]
  },

  // 17. Edward V (1483)
  17: {
    monarchId: 17,
    monarchName: "Edward V",
    reignPeriod: "1483",
    reignStart: 1483,
    reignEnd: 1483,
    keyHighlights: [
      "Reigned for just 78 days at age 12; never crowned.",
      "Lodged in the Tower of London by his uncle and Lord Protector Richard, Duke of Gloucester.",
      "Declared illegitimate alongside his brother Richard of Shrewsbury (the 'Princes in the Tower') under Titulus Regius.",
      "Disappeared mysteriously from the Tower, widely believed murdered."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Louis XI", title: "King of France", years: "1461–1483" },
      { name: "Charles VIII ('the Affable')", title: "King of France", years: "1483–1498" }
    ]
  },

  // 18. Richard III (1483–1485)
  18: {
    monarchId: 18,
    monarchName: "Richard III",
    reignPeriod: "1483–1485",
    reignStart: 1483,
    reignEnd: 1485,
    keyHighlights: [
      "Instituted notable legal reforms, including English-language statutes and the College of Arms.",
      "Reign undermined by outrage over the disappearance of his nephews and the rebellion of the Duke of Buckingham.",
      "Defeated and killed at the Battle of Bosworth Field (August 1485), the last English king to die in battle.",
      "His skeletal remains were famously discovered under a Leicester council car park in 2012."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Charles VIII", title: "King of France (House of Valois)", years: "1483–1498", note: "Financed and supported Henry Tudor's expedition that overthrew Richard III." }
    ]
  },

  // 19. Henry VII (1485–1509)
  19: {
    monarchId: 19,
    monarchName: "Henry VII",
    reignPeriod: "1485–1509",
    reignStart: 1485,
    reignEnd: 1509,
    keyHighlights: [
      "Founded the Tudor Dynasty; united the Houses of Lancaster and York by marrying Elizabeth of York.",
      "Extinguished pretender uprisings (Lambert Simnel, Perkin Warbeck) and subordinated noble private armies.",
      "Restored royal solvency through strict taxation, Court of Star Chamber, and financial efficiency.",
      "Sponsored John Cabot's historic voyage to North America (Newfoundland, 1497)."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Charles VIII", title: "King of France", years: "1483–1498", note: "Invaded Italy, triggering the Italian Wars." },
      { name: "Louis XII ('Father of the People')", title: "King of France (Valois-Orléans)", years: "1498–1515", note: "Maintained peaceful diplomatic ties with Henry VII." }
    ]
  },

  // 20. Henry VIII (1509–1547)
  20: {
    monarchId: 20,
    monarchName: "Henry VIII",
    reignPeriod: "1509–1547",
    reignStart: 1509,
    reignEnd: 1547,
    keyHighlights: [
      "Initiated the English Reformation; broke with Rome and declared himself Supreme Head of the Church of England (1534).",
      "Dissolution of the Monasteries (1536–1541), transferring vast ecclesiastical wealth to the crown and gentry.",
      "Infamous for six marriages (Catherine of Aragon, Anne Boleyn, Jane Seymour, Anne of Cleves, Catherine Howard, Catherine Parr).",
      "Founded the Royal Navy ('Father of the Navy') and incorporated Wales legally into England via the Acts of Union."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Louis XII", title: "King of France", years: "1498–1515" },
      { name: "Francis I", title: "King of France (House of Valois-Angoulême)", years: "1515–1547", note: "Famous Renaissance rival; met Henry VIII at the extravagant Field of the Cloth of Gold (1520)." }
    ]
  },

  // 21. Edward VI (1547–1553)
  21: {
    monarchId: 21,
    monarchName: "Edward VI",
    reignPeriod: "1547–1553",
    reignStart: 1547,
    reignEnd: 1553,
    keyHighlights: [
      "England's first monarch raised as a Protestant; crowned at age nine with regency led by Somerset then Northumberland.",
      "Introduction of Thomas Cranmer's Book of Common Prayer (1549 & 1552) establishing full Protestant liturgy.",
      "Stripping of altars, images, and chantry chapels across parish churches.",
      "Attempted to bypass half-sisters Mary and Elizabeth by naming Lady Jane Grey heir in his 'Device for the Succession'."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Henry II", title: "King of France (House of Valois)", years: "1547–1559", note: "Continued Italian Wars against Emperor Charles V and supported Mary, Queen of Scots." }
    ]
  },

  // 22. Mary I (1553–1558)
  22: {
    monarchId: 22,
    monarchName: "Mary I",
    reignPeriod: "1553–1558",
    reignStart: 1553,
    reignEnd: 1558,
    keyHighlights: [
      "First undisputed Queen Regnant of England; ousted Lady Jane Grey to reclaim her birthright.",
      "Restored Catholicism and papal jurisdiction; repealed Edwardian religious legislation.",
      "Burned over 280 Protestant religious dissenters at the stake (including Thomas Cranmer), earning the epithet 'Bloody Mary'.",
      "Married King Philip II of Spain (1554), dragging England into war with France resulting in the loss of Calais (1558)."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Henry II", title: "King of France (House of Valois)", years: "1547–1559", note: "French forces captured Calais (1558), ending England's last continental possession." }
    ]
  },

  // 23. Elizabeth I (1558–1603)
  23: {
    monarchId: 23,
    monarchName: "Elizabeth I",
    reignPeriod: "1558–1603",
    reignStart: 1558,
    reignEnd: 1603,
    keyHighlights: [
      "The Elizabethan Religious Settlement established the moderate Protestant Church of England via Acts of Supremacy and Uniformity (1559).",
      "Dramatic defeat of the Spanish Armada (1588) with Elizabeth's famed Tilbury Speech.",
      "Golden Age of English literature, drama, and exploration: William Shakespeare, Christopher Marlowe, Sir Francis Drake, Sir Walter Raleigh.",
      "Execution of Mary, Queen of Scots (1587) after the Babington Plot; chartered the East India Company (1600)."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Henry II", title: "King of France", years: "1547–1559" },
      { name: "Francis II", title: "King of France", years: "1559–1560", note: "First husband of Mary, Queen of Scots." },
      { name: "Charles IX", title: "King of France", years: "1560–1574", note: "St. Bartholomew's Day Massacre (1572)." },
      { name: "Henry III", title: "King of France", years: "1574–1589", note: "Last Valois king; assassinated during French Wars of Religion." },
      { name: "Henry IV ('the Great')", title: "King of France (House of Bourbon)", years: "1589–1610", note: "First Bourbon king; promulgated Edict of Nantes (1598) establishing religious tolerance." }
    ]
  },

  // 24. James I (1603–1625)
  24: {
    monarchId: 24,
    monarchName: "James I",
    reignPeriod: "1603–1625",
    reignStart: 1603,
    reignEnd: 1625,
    keyHighlights: [
      "First Stuart King of England; previously James VI of Scotland, creating the Union of the Crowns (1603).",
      "Survives the Catholic Gunpowder Plot to blow up Parliament (November 5, 1605).",
      "Commissioned the King James Bible (published 1611), landmark of English literature.",
      "Permanent English settlement founded at Jamestown, Virginia (1607) and the arrival of the Mayflower pilgrims (1620)."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Henry IV ('Good King Henry')", title: "King of France (House of Bourbon)", years: "1589–1610" },
      { name: "Louis XIII", title: "King of France (House of Bourbon)", years: "1610–1643", note: "Governed alongside Cardinal Richelieu, centralizing French power." }
    ]
  },

  // 25. Charles I (1625–1649)
  25: {
    monarchId: 25,
    monarchName: "Charles I",
    reignPeriod: "1625–1649",
    reignStart: 1625,
    reignEnd: 1649,
    keyHighlights: [
      "Advocated divine right of kings and ruled for eleven years without Parliament ('Personal Rule' / 'Eleven Years' Tyranny', 1629–1640).",
      "English Civil War (1642–1651) erupted between Royalist Cavaliers and Parliamentary Roundheads led by Oliver Cromwell.",
      "Captured, tried for high treason against his people, and publicly beheaded outside Banqueting House, Whitehall (January 30, 1649).",
      "England declared a Commonwealth republic; monarchy and House of Lords abolished."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Louis XIII", title: "King of France (House of Bourbon)", years: "1610–1643" },
      { name: "Louis XIV ('the Sun King')", title: "King of France (House of Bourbon)", years: "1643–1715", note: "Ascended at age 4 under regency of Anne of Austria and Cardinal Mazarin." }
    ]
  },

  // 26. Charles II (1660–1685)
  26: {
    monarchId: 26,
    monarchName: "Charles II",
    reignPeriod: "1660–1685",
    reignStart: 1660,
    reignEnd: 1685,
    keyHighlights: [
      "The Restoration (1660) returned the monarchy and reopened theaters, earning him the title 'The Merry Monarch'.",
      "Navigated the Great Plague of London (1665) and the Great Fire of London (1666); supported Christopher Wren's rebuilding.",
      "Chartered the Royal Society (1660) for science, fostering figures like Isaac Newton and Robert Hooke.",
      "Habeas Corpus Act passed (1679); secretly accepted French subsidies from Louis XIV via the Treaty of Dover."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Louis XIV ('the Sun King')", title: "King of France (House of Bourbon)", years: "1643–1715", note: "Peak of French absolute monarchy; built Palace of Versailles; cousin and financier to Charles II." }
    ]
  },

  // 27. James II (1685–1688)
  27: {
    monarchId: 27,
    monarchName: "James II",
    reignPeriod: "1685–1688",
    reignStart: 1685,
    reignEnd: 1688,
    keyHighlights: [
      "Crushed Monmouth Rebellion (1685), followed by Judge Jeffreys' notorious 'Bloody Assizes'.",
      "Promoted Roman Catholicism, issuing Declarations of Indulgence and suspending penal laws against Catholics.",
      "The birth of a Catholic male heir in 1688 prompted the Immortal Seven to invite William of Orange to intervene.",
      "The Glorious Revolution (1688) ousted James II bloodlessly to France; fled to Saint-Germain-en-Laye under Louis XIV's protection."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Louis XIV ('the Sun King')", title: "King of France (House of Bourbon)", years: "1643–1715", note: "Revoked Edict of Nantes (1685) driving Huguenots to England; hosted the exiled James II." }
    ]
  },

  // 28. William III & Mary II (1689–1702)
  28: {
    monarchId: 28,
    monarchName: "William III & Mary II",
    reignPeriod: "1689–1702",
    reignStart: 1689,
    reignEnd: 1702,
    keyHighlights: [
      "Offered the crown jointly after accepting the landmark Bill of Rights (1689), establishing a constitutional monarchy.",
      "Defeated Jacobite forces in Ireland at the Battle of the Boyne (1690).",
      "Founded the Bank of England (1694) to finance continental warfare against Louis XIV; Act of Settlement (1701) secured Protestant succession.",
      "Queen Mary II died of smallpox in 1694; William III ruled alone until 1702."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Louis XIV ('the Sun King')", title: "King of France (House of Bourbon)", years: "1643–1715", note: "Engaged in Nine Years' War against William III's Grand Alliance; recognized William at Treaty of Ryswick (1697)." }
    ]
  },

  // 29. Anne (1702–1714)
  29: {
    monarchId: 29,
    monarchName: "Anne",
    reignPeriod: "1702–1714",
    reignStart: 1702,
    reignEnd: 1714,
    keyHighlights: [
      "Acts of Union 1707 united the Kingdoms of England and Scotland into a single sovereign state: Great Britain.",
      "Duke of Marlborough won stunning military triumphs in the War of the Spanish Succession (Blenheim, Ramillies, Oudenarde, Malplaquet).",
      "Treaty of Utrecht (1713) secured Gibraltar, Minorca, and territory in North America, establishing British global naval dominance.",
      "Last Stuart monarch; despite 17 pregnancies, had no surviving children, triggering the Hanoverian succession."
    ],
    ukPrimeMinisters: [],
    usPresidents: [],
    frenchRulers: [
      { name: "Louis XIV ('the Sun King')", title: "King of France (House of Bourbon)", years: "1643–1715", note: "Exhausted French treasury in War of the Spanish Succession; agreed to partition at Utrecht (1713)." }
    ]
  },

  // 30. George I (1714–1727)
  30: {
    monarchId: 30,
    monarchName: "George I",
    reignPeriod: "1714–1727",
    reignStart: 1714,
    reignEnd: 1727,
    keyHighlights: [
      "First British monarch from the German House of Hanover under the Act of Settlement 1701.",
      "Sir Robert Walpole became Britain's first de facto Prime Minister in 1721, initiating cabinet-led government.",
      "Defeated the First Jacobite Rising of 1715 ('The Fifteen') supporting the Old Pretender.",
      "Handled the financial fallout of the South Sea Bubble collapse (1720)."
    ],
    contemporaryContext: "The office of British Prime Minister was created during George I's reign with Sir Robert Walpole taking office in 1721.",
    ukPrimeMinisters: [
      { name: "Sir Robert Walpole", title: "First Prime Minister of Great Britain", partyOrDynasty: "Whig", years: "1721–1742", note: "First and longest-serving British Prime Minister (over 20 years in office)." }
    ],
    usPresidents: [],
    frenchRulers: [
      { name: "Louis XIV", title: "King of France", years: "1643–1715", note: "Died after a 72-year reign, shortest overlap." },
      { name: "Louis XV ('the Beloved')", title: "King of France (House of Bourbon)", years: "1715–1774", note: "Regency of Philippe, Duke of Orléans (1715–1723); followed by Cardinal Fleury's administration." }
    ]
  },

  // 31. George II (1727–1760)
  31: {
    monarchId: 31,
    monarchName: "George II",
    reignPeriod: "1727–1760",
    reignStart: 1727,
    reignEnd: 1760,
    keyHighlights: [
      "The last British monarch to lead troops in person on the battlefield at Dettingen (1743) during the War of the Austrian Succession.",
      "Defeat of Bonnie Prince Charlie and the Jacobite Rising of 1745 at the decisive Battle of Culloden (1746).",
      "Global British victories in the Seven Years' War ('Annus Mirabilis', 1759) under William Pitt the Elder: capture of Quebec, naval victory at Quiberon Bay.",
      "Adoption of the Gregorian Calendar in Britain (1752), skipping 11 days in September."
    ],
    ukPrimeMinisters: [
      { name: "Sir Robert Walpole", partyOrDynasty: "Whig", years: "1721–1742" },
      { name: "Spencer Compton, 1st Earl of Wilmington", partyOrDynasty: "Whig", years: "1742–1743" },
      { name: "Henry Pelham", partyOrDynasty: "Whig", years: "1743–1754", note: "Stabilized government finance and funded the Broad Bottom administration." },
      { name: "Thomas Pelham-Holles, 1st Duke of Newcastle", partyOrDynasty: "Whig", years: "1754–1756, 1757–1762", note: "Managed wartime coalitions with Pitt the Elder." },
      { name: "William Cavendish, 4th Duke of Devonshire", partyOrDynasty: "Whig", years: "1756–1757" }
    ],
    usPresidents: [],
    frenchRulers: [
      { name: "Louis XV ('the Beloved')", title: "King of France (House of Bourbon)", years: "1715–1774", note: "Fought Great Britain in War of the Austrian Succession and Seven Years' War, losing New France and India." }
    ]
  },

  // 32. George III (1760–1820)
  32: {
    monarchId: 32,
    monarchName: "George III",
    reignPeriod: "1760–1820",
    reignStart: 1760,
    reignEnd: 1820,
    keyHighlights: [
      "Loss of the Thirteen American Colonies in the American Revolutionary War (1775–1783), recognizing US independence.",
      "Triumph over Napoleonic France: naval victory at Trafalgar (1805) and final defeat of Napoleon at Waterloo (1815).",
      "Act of Union 1800 united Great Britain and Ireland into the United Kingdom; Abolition of the Slave Trade Act (1807).",
      "Began the Industrial Revolution; mental health illness led to the Regency of his son, the Prince of Wales, in 1811."
    ],
    contemporaryContext: "The United States was established during George III's reign, with the Declaration of Independence in 1776 and George Washington taking office in 1789. France experienced the French Revolution, the First Republic, and Napoleon's Empire.",
    ukPrimeMinisters: [
      { name: "Lord Bute (John Stuart)", partyOrDynasty: "Tory", years: "1762–1763" },
      { name: "George Grenville", partyOrDynasty: "Whig", years: "1763–1765", note: "Introduced Stamp Act." },
      { name: "Lord Rockingham", partyOrDynasty: "Whig", years: "1765–1766, 1782" },
      { name: "William Pitt the Elder (Earl of Chatham)", partyOrDynasty: "Whig", years: "1766–1768" },
      { name: "Duke of Grafton", partyOrDynasty: "Whig", years: "1768–1770" },
      { name: "Lord North (Frederick North)", partyOrDynasty: "Tory", years: "1770–1782", note: "PM during the American War of Independence." },
      { name: "Lord Shelburne", partyOrDynasty: "Whig", years: "1782–1783", note: "Negotiated Peace of Paris." },
      { name: "Duke of Portland", partyOrDynasty: "Whig/Tory", years: "1783, 1807–1809" },
      { name: "William Pitt the Younger", partyOrDynasty: "Tory", years: "1783–1801, 1804–1806", note: "Youngest PM at 24; led Britain through French Revolutionary Wars." },
      { name: "Henry Addington", partyOrDynasty: "Tory", years: "1801–1804" },
      { name: "Lord Grenville", partyOrDynasty: "Whig", years: "1806–1807", note: "Abolished transatlantic slave trade (1807)." },
      { name: "Spencer Perceval", partyOrDynasty: "Tory", years: "1809–1812", note: "Only British PM assassinated in office." },
      { name: "Lord Liverpool (Robert Jenkinson)", partyOrDynasty: "Tory", years: "1812–1827", note: "PM during victory at Waterloo (1815) and post-war peace." }
    ],
    usPresidents: [
      { name: "George Washington", partyOrDynasty: "Independent/Federalist", years: "1789–1797", note: "1st US President; Continental Army commander." },
      { name: "John Adams", partyOrDynasty: "Federalist", years: "1797–1801", note: "2nd US President; first US minister to Court of St. James's." },
      { name: "Thomas Jefferson", partyOrDynasty: "Democratic-Republican", years: "1789 (Sec. State), 1801–1809", note: "3rd US President; primary author of Declaration of Independence." },
      { name: "James Madison", partyOrDynasty: "Democratic-Republican", years: "1809–1817", note: "4th US President; led US during War of 1812 against Great Britain." },
      { name: "James Monroe", partyOrDynasty: "Democratic-Republican", years: "1817–1825", note: "5th US President; formulated the Monroe Doctrine." }
    ],
    frenchRulers: [
      { name: "Louis XV", title: "King of France", years: "1715–1774" },
      { name: "Louis XVI", title: "King of France", years: "1774–1792", note: "Guillotined during the French Revolution (Jan 1793)." },
      { name: "National Convention / Directory / Consulate", title: "French First Republic", years: "1792–1804", note: "Reign of Terror and rise of Napoleon Bonaparte." },
      { name: "Napoleon I (Bonaparte)", title: "Emperor of the French (First Empire)", years: "1804–1814, 1815 (Hundred Days)", note: "Master of continental Europe; defeated at Waterloo." },
      { name: "Louis XVIII", title: "King of France (Bourbon Restoration)", years: "1814–1815, 1815–1824", note: "Restored after Napoleon's fall." }
    ]
  },

  // 33. George IV (1820–1830)
  33: {
    monarchId: 33,
    monarchName: "George IV",
    reignPeriod: "1820–1830",
    reignStart: 1820,
    reignEnd: 1830,
    keyHighlights: [
      "Famous for Regency architecture, extravagant spending, and building the Royal Pavilion in Brighton and Buckingham Palace.",
      "Roman Catholic Relief Act 1829 signed under government pressure, allowing Catholics to sit in Parliament.",
      "Attempted to divorce Queen Caroline via the controversial Pains and Penalties Bill 1820, barring her from his coronation.",
      "Metropolitan Police founded by Home Secretary Robert Peel in 1829."
    ],
    ukPrimeMinisters: [
      { name: "Lord Liverpool", partyOrDynasty: "Tory", years: "1812–1827" },
      { name: "George Canning", partyOrDynasty: "Tory", years: "1827", note: "Died after just 119 days in office." },
      { name: "Lord Goderich (F. J. Robinson)", partyOrDynasty: "Tory", years: "1827–1828" },
      { name: "Duke of Wellington (Arthur Wellesley)", partyOrDynasty: "Tory", years: "1828–1830", note: "Victor of Waterloo; passed Catholic Emancipation." }
    ],
    usPresidents: [
      { name: "James Monroe", partyOrDynasty: "Democratic-Republican", years: "1817–1825" },
      { name: "John Quincy Adams", partyOrDynasty: "National Republican", years: "1825–1829", note: "6th US President; former ambassador to Britain." },
      { name: "Andrew Jackson", partyOrDynasty: "Democrat", years: "1829–1837", note: "7th US President; hero of the Battle of New Orleans." }
    ],
    frenchRulers: [
      { name: "Louis XVIII", title: "King of France (Bourbon Restoration)", years: "1815–1824" },
      { name: "Charles X", title: "King of France (Bourbon Restoration)", years: "1824–1830", note: "Ultra-royalist deposed in the July Revolution of 1830." }
    ]
  },

  // 34. William IV (1830–1837)
  34: {
    monarchId: 34,
    monarchName: "William IV",
    reignPeriod: "1830–1837",
    reignStart: 1830,
    reignEnd: 1837,
    keyHighlights: [
      "Known as the 'Sailor King' for serving in the Royal Navy in his youth.",
      "Great Reform Act 1832 swept away 'rotten boroughs' and expanded the parliamentary franchise.",
      "Slavery Abolition Act 1833 ended slavery throughout almost all of the British Empire.",
      "Factory Act 1833 restricted child labor; Poor Law Amendment Act 1834 established the workhouse system."
    ],
    ukPrimeMinisters: [
      { name: "Duke of Wellington", partyOrDynasty: "Tory", years: "1828–1830, 1834 (caretaker)" },
      { name: "Earl Grey (Charles Grey)", partyOrDynasty: "Whig", years: "1830–1834", note: "Passed the landmark Great Reform Act 1832 and Abolition of Slavery." },
      { name: "Lord Melbourne (William Lamb)", partyOrDynasty: "Whig", years: "1834, 1835–1841" },
      { name: "Sir Robert Peel", partyOrDynasty: "Conservative", years: "1834–1835", note: "Issued Tamworth Manifesto, founding modern Conservative party." }
    ],
    usPresidents: [
      { name: "Andrew Jackson", partyOrDynasty: "Democrat", years: "1829–1837" },
      { name: "Martin Van Buren", partyOrDynasty: "Democrat", years: "1837–1841", note: "8th US President." }
    ],
    frenchRulers: [
      { name: "Louis-Philippe I", title: "King of the French (July Monarchy, House of Orléans)", years: "1830–1848", note: "The 'Citizen King', established constitutional bourgeois monarchy." }
    ]
  },

  // 35. Victoria (1837–1901)
  35: {
    monarchId: 35,
    monarchName: "Victoria",
    reignPeriod: "1837–1901",
    reignStart: 1837,
    reignEnd: 1901,
    keyHighlights: [
      "63-year Victorian Era saw the zenith of the British Empire spanning a quarter of the globe ('The empire on which the sun never sets').",
      "Proclaimed Empress of India (1876) under Prime Minister Benjamin Disraeli.",
      "Great Exhibition of 1851 at the Crystal Palace championed by Prince Consort Albert; industrial revolution transformed railways and cities.",
      "Endured deep mourning following Prince Albert's death in 1861; celebrated Golden (1887) and Diamond (1897) Jubilees."
    ],
    contemporaryContext: "Victoria's long reign overlapped with 10 UK Prime Ministers, 18 US Presidents, and 12 distinct French regimes/heads of state.",
    ukPrimeMinisters: [
      { name: "Lord Melbourne", partyOrDynasty: "Whig", years: "1835–1841", note: "Early political mentor and close confidant to the young Queen." },
      { name: "Sir Robert Peel", partyOrDynasty: "Conservative", years: "1841–1846", note: "Repealed the Corn Laws in 1846." },
      { name: "Lord John Russell", partyOrDynasty: "Whig/Liberal", years: "1846–1852, 1865–1866" },
      { name: "Earl of Derby", partyOrDynasty: "Conservative", years: "1852, 1858–1859, 1866–1868", note: "Second Reform Act 1867." },
      { name: "Earl of Aberdeen", partyOrDynasty: "Peelite", years: "1852–1855", note: "Led coalition during Crimean War." },
      { name: "Lord Palmerston", partyOrDynasty: "Whig/Liberal", years: "1855–1858, 1859–1865", note: "Gunboat diplomacy; Indian Rebellion of 1857." },
      { name: "Benjamin Disraeli (Earl of Beaconsfield)", partyOrDynasty: "Conservative", years: "1868, 1874–1880", note: "Imperialist; purchased Suez Canal shares; made Victoria Empress of India." },
      { name: "William Ewart Gladstone", partyOrDynasty: "Liberal", years: "1868–1874, 1880–1885, 1886, 1892–1894", note: "'The Grand Old Man'; four terms; championed Irish Home Rule." },
      { name: "Lord Salisbury (Robert Gascoyne-Cecil)", partyOrDynasty: "Conservative", years: "1885–1886, 1886–1892, 1895–1902", note: "'Splendid Isolation'; Boer War; Scramble for Africa." },
      { name: "Earl of Rosebery", partyOrDynasty: "Liberal", years: "1894–1895" }
    ],
    usPresidents: [
      { name: "Martin Van Buren", partyOrDynasty: "Democrat", years: "1837–1841" },
      { name: "William Henry Harrison", partyOrDynasty: "Whig", years: "1841 (31 days)" },
      { name: "John Tyler", partyOrDynasty: "Whig", years: "1841–1845" },
      { name: "James K. Polk", partyOrDynasty: "Democrat", years: "1845–1849", note: "Mexican-American War; Oregon Treaty with Britain." },
      { name: "Zachary Taylor", partyOrDynasty: "Whig", years: "1849–1850" },
      { name: "Millard Fillmore", partyOrDynasty: "Whig", years: "1850–1853" },
      { name: "Franklin Pierce", partyOrDynasty: "Democrat", years: "1853–1857" },
      { name: "James Buchanan", partyOrDynasty: "Democrat", years: "1857–1861" },
      { name: "Abraham Lincoln", partyOrDynasty: "Republican", years: "1861–1865", note: "American Civil War; Emancipation Proclamation; Trent Affair with UK." },
      { name: "Andrew Johnson", partyOrDynasty: "National Union", years: "1865–1869" },
      { name: "Ulysses S. Grant", partyOrDynasty: "Republican", years: "1869–1877", note: "Resolved Alabama Claims with UK (Treaty of Washington 1871)." },
      { name: "Rutherford B. Hayes", partyOrDynasty: "Republican", years: "1877–1881" },
      { name: "James A. Garfield", partyOrDynasty: "Republican", years: "1881" },
      { name: "Chester A. Arthur", partyOrDynasty: "Republican", years: "1881–1885" },
      { name: "Grover Cleveland", partyOrDynasty: "Democrat", years: "1885–1889, 1893–1897" },
      { name: "Benjamin Harrison", partyOrDynasty: "Republican", years: "1889–1893" },
      { name: "William McKinley", partyOrDynasty: "Republican", years: "1897–1901", note: "Spanish-American War." }
    ],
    frenchRulers: [
      { name: "Louis-Philippe I", title: "King of the French", years: "1830–1848", note: "Overthrown in the French Revolution of 1848." },
      { name: "French Second Republic (Louis-Napoléon Bonaparte, Pres.)", title: "President of the Republic", years: "1848–1852" },
      { name: "Napoleon III", title: "Emperor of the French (Second Empire)", years: "1852–1870", note: "Allied with Britain in Crimean War (1853–1856); overthrown after Franco-Prussian War." },
      { name: "French Third Republic", title: "Presidents of the French Third Republic", years: "1870–1940", note: "Adolphe Thiers (1871–73), Patrice de MacMahon (1873–79), Jules Grévy (1879–87), Sadi Carnot (1887–94), Félix Faure (1895–99), Émile Loubet (1899–1906)." }
    ]
  },

  // 36. Edward VII (1901–1910)
  36: {
    monarchId: 36,
    monarchName: "Edward VII",
    reignPeriod: "1901–1910",
    reignStart: 1901,
    reignEnd: 1910,
    keyHighlights: [
      "The Edwardian Era brought a fashionable, outward-looking culture; Edward earned the title 'Peacemaker'.",
      "Crucial diplomatic architect of the Entente Cordiale with France (1904) and the Anglo-Russian Convention (1907).",
      "Creation of the Territorial Army and modernized dreadnought battle fleets under Admiral Jackie Fisher.",
      "Reign dominated by constitutional clash over David Lloyd George's 'People's Budget' (1909), leading to the curtailment of House of Lords veto."
    ],
    ukPrimeMinisters: [
      { name: "Lord Salisbury", partyOrDynasty: "Conservative", years: "1895–1902", note: "End of the Second Boer War." },
      { name: "Arthur Balfour", partyOrDynasty: "Conservative", years: "1902–1905", note: "Education Act 1902; Entente Cordiale." },
      { name: "Sir Henry Campbell-Bannerman", partyOrDynasty: "Liberal", years: "1905–1908", note: "First to be officially designated 'Prime Minister' by royal warrant." },
      { name: "H. H. Asquith", partyOrDynasty: "Liberal", years: "1908–1916", note: "Introduced Old Age Pensions (1908) and People's Budget." }
    ],
    usPresidents: [
      { name: "William McKinley", partyOrDynasty: "Republican", years: "1897–1901", note: "Assassinated in Sept 1901." },
      { name: "Theodore Roosevelt", partyOrDynasty: "Republican", years: "1901–1909", note: "26th US President; Panama Canal, Nobel Peace Prize; represented US at Edward's funeral." },
      { name: "William Howard Taft", partyOrDynasty: "Republican", years: "1909–1913", note: "27th US President." }
    ],
    frenchRulers: [
      { name: "Émile Loubet", title: "President of the French Republic", years: "1899–1906", note: "Welcomed Edward VII to Paris, facilitating the Entente Cordiale (1904)." },
      { name: "Armand Fallières", title: "President of the French Republic", years: "1906–1913", note: "Deepened Anglo-French military staff talks." }
    ]
  },

  // 37. George V (1910–1936)
  37: {
    monarchId: 37,
    monarchName: "George V",
    reignPeriod: "1910–1936",
    reignStart: 1910,
    reignEnd: 1936,
    keyHighlights: [
      "Led the British Empire through the unprecedented trauma and sacrifice of World War I (1914–1918).",
      "Changed the royal dynastic surname from Saxe-Coburg and Gotha to the English House of Windsor in 1917.",
      "Partition of Ireland and Irish Free State created (1922); appointed Britain's first Labour government under Ramsay MacDonald (1924).",
      "Statute of Westminster (1931) recognized dominions (Canada, Australia, etc.) as autonomous equal nations; initiated the annual Royal Christmas broadcast (1932)."
    ],
    ukPrimeMinisters: [
      { name: "H. H. Asquith", partyOrDynasty: "Liberal", years: "1908–1916", note: "Led Britain into WWI in Aug 1914; Parliament Act 1911." },
      { name: "David Lloyd George", partyOrDynasty: "Liberal (Coalition)", years: "1916–1922", note: "'The Man Who Won the War'; Versailles Treaty; Irish Treaty 1921." },
      { name: "Bonar Law", partyOrDynasty: "Conservative", years: "1922–1923" },
      { name: "Stanley Baldwin", partyOrDynasty: "Conservative", years: "1923–1924, 1924–1929, 1935–1937", note: "General Strike of 1926." },
      { name: "Ramsay MacDonald", partyOrDynasty: "Labour / National", years: "1924, 1929–1935", note: "First Labour PM; Great Depression; National Government 1931." }
    ],
    usPresidents: [
      { name: "William Howard Taft", partyOrDynasty: "Republican", years: "1909–1913" },
      { name: "Woodrow Wilson", partyOrDynasty: "Democrat", years: "1913–1921", note: "WWI US leadership; Fourteen Points; League of Nations." },
      { name: "Warren G. Harding", partyOrDynasty: "Republican", years: "1921–1923" },
      { name: "Calvin Coolidge", partyOrDynasty: "Republican", years: "1923–1929", note: "'Roaring Twenties'." },
      { name: "Herbert Hoover", partyOrDynasty: "Republican", years: "1929–1933", note: "Wall Street Crash 1929 and Great Depression." },
      { name: "Franklin D. Roosevelt", partyOrDynasty: "Democrat", years: "1933–1945", note: "New Deal economic recovery program." }
    ],
    frenchRulers: [
      { name: "Armand Fallières", title: "President of the French Republic", years: "1906–1913" },
      { name: "Raymond Poincaré", title: "President of the French Republic", years: "1913–1920", note: "President through WWI, allied with Britain and George V." },
      { name: "Paul Deschanel", title: "President", years: "1920" },
      { name: "Alexandre Millerand", title: "President", years: "1920–1924" },
      { name: "Gaston Doumergue", title: "President", years: "1924–1931" },
      { name: "Paul Doumer", title: "President", years: "1931–1932 (assassinated)" },
      { name: "Albert Lebrun", title: "President of the French Republic", years: "1932–1940", note: "Last president of the Third Republic before fall of France." }
    ]
  },

  // 38. Edward VIII (1936)
  38: {
    monarchId: 38,
    monarchName: "Edward VIII",
    reignPeriod: "1936",
    reignStart: 1936,
    reignEnd: 1936,
    keyHighlights: [
      "Reigned for just 326 days; never had a coronation ceremony.",
      "Provoked a severe constitutional crisis by intending to marry Wallis Simpson, an American divorcée.",
      "PM Stanley Baldwin and Dominion governments refused to accept the union, warning the monarchy would lose its institutional standing.",
      "Abdicated on December 10, 1936 ('A King's Story' radio broadcast: 'I have found it impossible to carry the heavy burden... without the help and support of the woman I love'); became Duke of Windsor."
    ],
    ukPrimeMinisters: [
      { name: "Stanley Baldwin", partyOrDynasty: "Conservative (National Govt)", years: "1935–1937", note: "Managed the delicate abdication crisis to a peaceful resolution." }
    ],
    usPresidents: [
      { name: "Franklin D. Roosevelt", partyOrDynasty: "Democrat", years: "1933–1945", note: "Won historic landslide re-election in 1936 during Edward's brief reign." }
    ],
    frenchRulers: [
      { name: "Albert Lebrun", title: "President of the French Republic", years: "1932–1940", note: "Léon Blum led the Popular Front government in France in 1936." }
    ]
  },

  // 39. George VI (1936–1952)
  39: {
    monarchId: 39,
    monarchName: "George VI",
    reignPeriod: "1936–1952",
    reignStart: 1936,
    reignEnd: 1952,
    keyHighlights: [
      "Stepped into the monarchy reluctantly after his brother's shock abdication, overcoming a severe speech impediment.",
      "Steadfast figurehead of British courage in World War II; remained with Queen Elizabeth at Buckingham Palace during the Blitz.",
      "Close wartime partnership with Prime Minister Winston Churchill; made morale-boosting visits to bombed factories and troops overseas.",
      "Dissolution of the British Empire began: Indian independence (1947) relinquished the title 'Emperor of India'; creation of modern Commonwealth and NHS."
    ],
    ukPrimeMinisters: [
      { name: "Stanley Baldwin", partyOrDynasty: "Conservative (National)", years: "1935–1937", note: "Retired after crowning George VI in May 1937." },
      { name: "Neville Chamberlain", partyOrDynasty: "Conservative (National)", years: "1937–1940", note: "Policy of appeasement; Munich Agreement 1938; declared war on Germany (Sept 3, 1939)." },
      { name: "Sir Winston Churchill", partyOrDynasty: "Conservative (Coalition)", years: "1940–1945, 1951–1955", note: "Heroic wartime leader; regular Tuesday private lunches with the King." },
      { name: "Clement Attlee", partyOrDynasty: "Labour", years: "1945–1951", note: "Founded the National Health Service (NHS), welfare state, and granted independence to India & Pakistan." }
    ],
    usPresidents: [
      { name: "Franklin D. Roosevelt", partyOrDynasty: "Democrat", years: "1933–1945", note: "First sitting US President to host a reigning British monarch (1939 royal tour); Lend-Lease, Atlantic Charter." },
      { name: "Harry S. Truman", partyOrDynasty: "Democrat", years: "1945–1953", note: "Ended WWII; Marshall Plan rebuilding Europe; Korean War; NATO alliance." }
    ],
    frenchRulers: [
      { name: "Albert Lebrun", title: "President of the French Republic", years: "1932–1940" },
      { name: "Philippe Pétain", title: "Chief of the French State (Vichy France)", years: "1940–1944", note: "Collaborationist regime in southern France." },
      { name: "Charles de Gaulle", title: "Leader of Free France & Provisional President", years: "1940–1946", note: "Based in London during WWII, coordinating Free French forces alongside Britain." },
      { name: "Vincent Auriol", title: "President of the French Fourth Republic", years: "1947–1954", note: "First president under the post-war Fourth Republic constitution." }
    ]
  },

  // 40. Elizabeth II (1952–2022)
  40: {
    monarchId: 40,
    monarchName: "Elizabeth II",
    reignPeriod: "1952–2022",
    reignStart: 1952,
    reignEnd: 2022,
    keyHighlights: [
      "Britain's longest-reigning monarch (70 years, 214 days); celebrated Silver (1977), Golden (2002), Diamond (2012), and Platinum (2022) Jubilees.",
      "1953 coronation was the first major international event broadcast live on television to tens of millions worldwide.",
      "Headed the voluntary Commonwealth of 56 nations through post-colonial independence; traveled to more than 115 countries.",
      "Navigated the Cold War, entry and exit from the European Union (Brexit), and the dawn of the digital and internet age."
    ],
    contemporaryContext: "Elizabeth II worked with 15 UK Prime Ministers (from Winston Churchill to Liz Truss), saw 14 US Presidents (meeting 13 in person), and witnessed 10 French Presidents across the Fourth and Fifth Republics.",
    ukPrimeMinisters: [
      { name: "Sir Winston Churchill", partyOrDynasty: "Conservative", years: "1951–1955", note: "Her first Prime Minister, who had served under Queen Victoria." },
      { name: "Sir Anthony Eden", partyOrDynasty: "Conservative", years: "1955–1957", note: "Suez Crisis (1956)." },
      { name: "Harold Macmillan", partyOrDynasty: "Conservative", years: "1957–1963", note: "'Wind of Change' speech; Cuban Missile Crisis." },
      { name: "Sir Alec Douglas-Home", partyOrDynasty: "Conservative", years: "1963–1964" },
      { name: "Harold Wilson", partyOrDynasty: "Labour", years: "1964–1970, 1974–1976", note: "Social reforms; maintained close weekly audiences with the Queen." },
      { name: "Edward Heath", partyOrDynasty: "Conservative", years: "1970–1974", note: "Took the UK into the European Economic Community (1973)." },
      { name: "James Callaghan", partyOrDynasty: "Labour", years: "1976–1979", note: "'Winter of Discontent'." },
      { name: "Margaret Thatcher", partyOrDynasty: "Conservative", years: "1979–1990", note: "Britain's first female PM; Falklands War (1982); economic deregulation." },
      { name: "John Major", partyOrDynasty: "Conservative", years: "1990–1997", note: "Gulf War; Maastricht Treaty." },
      { name: "Tony Blair", partyOrDynasty: "Labour", years: "1997–2007", note: "'New Labour'; Good Friday Agreement (1998); Iraq War." },
      { name: "Gordon Brown", partyOrDynasty: "Labour", years: "2007–2010", note: "2008 global financial crisis." },
      { name: "David Cameron", partyOrDynasty: "Conservative (Coalition)", years: "2010–2016", note: "Scottish independence referendum (2014); Brexit referendum (2016)." },
      { name: "Theresa May", partyOrDynasty: "Conservative", years: "2016–2019", note: "Brexit negotiations." },
      { name: "Boris Johnson", partyOrDynasty: "Conservative", years: "2019–2022", note: "Delivered Brexit; COVID-19 pandemic response." },
      { name: "Liz Truss", partyOrDynasty: "Conservative", years: "2022", note: "Her final PM, formally invited to form a government at Balmoral just two days before the Queen passed away." }
    ],
    usPresidents: [
      { name: "Harry S. Truman", partyOrDynasty: "Democrat", years: "1945–1953", note: "Hosted Princess Elizabeth in Washington in 1951." },
      { name: "Dwight D. Eisenhower", partyOrDynasty: "Republican", years: "1953–1961", note: "Hosted her first official state visit as Queen (1957)." },
      { name: "John F. Kennedy", partyOrDynasty: "Democrat", years: "1961–1963", note: "Dined at Buckingham Palace in 1961; memorial dedicated at Runnymede." },
      { name: "Lyndon B. Johnson", partyOrDynasty: "Democrat", years: "1963–1969", note: "Only US president of her reign whom she did not meet in person." },
      { name: "Richard Nixon", partyOrDynasty: "Republican", years: "1969–1974", note: "Met in London and Washington." },
      { name: "Gerald Ford", partyOrDynasty: "Republican", years: "1974–1977", note: "Danced with the Queen at the 1976 Bicentennial state dinner." },
      { name: "Jimmy Carter", partyOrDynasty: "Democrat", years: "1977–1981", note: "Attended NATO dinner at Buckingham Palace." },
      { name: "Ronald Reagan", partyOrDynasty: "Republican", years: "1981–1989", note: "Famous horseback ride together around Windsor Castle in 1982." },
      { name: "George H. W. Bush", partyOrDynasty: "Republican", years: "1989–1993", note: "Addressed US Congress (1991); knighted KGB." },
      { name: "Bill Clinton", partyOrDynasty: "Democrat", years: "1993–2001", note: "Met on D-Day commemorations in 1994 and Belfast." },
      { name: "George W. Bush", partyOrDynasty: "Republican", years: "2001–2009", note: "State visits in 2003 (London) and 2007 (Jamestown 400th)." },
      { name: "Barack Obama", partyOrDynasty: "Democrat", years: "2009–2017", note: "Warm state visit in 2011; private tea at Windsor for 90th birthday." },
      { name: "Donald Trump", partyOrDynasty: "Republican", years: "2017–2021", note: "Working visit in 2018 and official state visit in 2019." },
      { name: "Joe Biden", partyOrDynasty: "Democrat", years: "2021–2025", note: "Hosted at Windsor Castle in June 2021; attended state funeral." }
    ],
    frenchRulers: [
      { name: "Vincent Auriol", title: "President of France", years: "1947–1954" },
      { name: "René Coty", title: "President of the Fourth Republic", years: "1954–1959", note: "Hosted Queen Elizabeth II on her celebrated 1957 state visit to Paris." },
      { name: "Charles de Gaulle", title: "President of the Fifth Republic", years: "1959–1969", note: "Founder of the Fifth French Republic; state visit to London (1960)." },
      { name: "Georges Pompidou", title: "President", years: "1969–1974", note: "Paved way for UK entry into Common Market." },
      { name: "Valéry Giscard d'Estaing", title: "President", years: "1974–1981" },
      { name: "François Mitterrand", title: "President", years: "1981–1995", note: "Jointly opened Channel Tunnel with Queen Elizabeth II (1994)." },
      { name: "Jacques Chirac", title: "President", years: "1995–2007", note: "Entente Cordiale centenary celebration in 2004." },
      { name: "Nicolas Sarkozy", title: "President", years: "2007–2012", note: "State visit to Windsor (2008)." },
      { name: "François Hollande", title: "President", years: "2012–2017", note: "Hosted Queen Elizabeth for 70th anniversary of D-Day in Normandy (2014)." },
      { name: "Emmanuel Macron", title: "President of the French Republic", years: "2017–present", note: "Tributed Queen as 'The Queen of hearts... she was a friend of France'." }
    ]
  },

  // 41. Charles III (2022–present)
  41: {
    monarchId: 41,
    monarchName: "Charles III",
    reignPeriod: "2022–present",
    reignStart: 2022,
    reignEnd: null,
    keyHighlights: [
      "Ascended to the throne on September 8, 2022, following the death of Queen Elizabeth II.",
      "Coronation at Westminster Abbey on May 6, 2023, along with Queen Camilla.",
      "First British monarch to address the French Senate in Paris (September 2023) and the German Bundestag.",
      "Champion of environmental stewardship, sustainable architecture, and the King's Foundation."
    ],
    contemporaryContext: "Charles III took the throne in 2022, serving as modern British head of state alongside current democratic leaders across the UK, US, and France.",
    ukPrimeMinisters: [
      { name: "Liz Truss", partyOrDynasty: "Conservative", years: "2022", note: "PM at accession; resigned after 49 days." },
      { name: "Rishi Sunak", partyOrDynasty: "Conservative", years: "2022–2024", note: "First British-Asian PM; served during Coronation." },
      { name: "Sir Keir Starmer", partyOrDynasty: "Labour", years: "2024–present", note: "Appointed July 2024 following Labour general election victory." }
    ],
    usPresidents: [
      { name: "Joe Biden", partyOrDynasty: "Democrat", years: "2021–2025", note: "Met King Charles III at Windsor Castle in July 2023 discussing climate finance." },
      { name: "Donald Trump", partyOrDynasty: "Republican", years: "2025–present", note: "47th US President." }
    ],
    frenchRulers: [
      { name: "Emmanuel Macron", title: "President of the French Republic", years: "2017–present", note: "Welcomed King Charles III on his first state visit to France in September 2023 with a banquet at Versailles." }
    ]
  }
};

export const getTenureHighlights = (monarchId: number): TenureHighlightsData | undefined => {
  return monarchTenureHighlights[monarchId];
};

(function () {
    'use strict';

    angular.module('zuriPopApp.common')
        .factory('dataService', ['Config', '$http', function (Config, $http) {
            var service = {},
                url = Config.data.url;

            service.getGemeindeKeys = function () {
                return $http.get(url + '/gemeindenr_zh.json');
            };

            service.getPopulationKanton = function () {
                return $http.get(url + '/bev_zh_kantonal.json');
            };

            service.getPopulationGemeinden = function () {
                return $http.get(url + '/bev_zh_gemeinden.json');
            };

            service.getGlobeData = function () {
                return $http.get(url +'/bevtot_merged_all_5_flat.min.json');
            };

            service.getGlobeLookUpTable = function () {
                return $http.get(url +'/globe_lookup_table.min.json');
            };

            service.getIndikatorDaten = function () {
                return $http.get(url +'/indikatoren_zh_gemeinden.json');
            };

            service.getAreaWhgDaten = function () {
                return $http.get(url +'/Area_and_Whg.min.json');
            };

            service.getAdditionalSidebarInfo = function () {
                return $http.get(url +'/Additional_sidebar_info.min.json');
            };

            var gemeindenr_zh = {
                "1": {"GDEBZNR":101,"GDENR":1,"GDENAME":"Aeugst am Albis","GDENAMK":"Aeugst am Albis","GDEBZNA":"Bezirk Affoltern"},
                "2": {"GDEBZNR":101,"GDENR":2,"GDENAME":"Affoltern am Albis","GDENAMK":"Affoltern am Albis","GDEBZNA":"Bezirk Affoltern"},
                "3": {"GDEBZNR":101,"GDENR":3,"GDENAME":"Bonstetten","GDENAMK":"Bonstetten","GDEBZNA":"Bezirk Affoltern"},
                "4": {"GDEBZNR":101,"GDENR":4,"GDENAME":"Hausen am Albis","GDENAMK":"Hausen am Albis","GDEBZNA":"Bezirk Affoltern"},
                "5": {"GDEBZNR":101,"GDENR":5,"GDENAME":"Hedingen","GDENAMK":"Hedingen","GDEBZNA":"Bezirk Affoltern"},
                "6": {"GDEBZNR":101,"GDENR":6,"GDENAME":"Kappel am Albis","GDENAMK":"Kappel am Albis","GDEBZNA":"Bezirk Affoltern"},
                "7": {"GDEBZNR":101,"GDENR":7,"GDENAME":"Knonau","GDENAMK":"Knonau","GDEBZNA":"Bezirk Affoltern"},
                "8": {"GDEBZNR":101,"GDENR":8,"GDENAME":"Maschwanden","GDENAMK":"Maschwanden","GDEBZNA":"Bezirk Affoltern"},
                "9": {"GDEBZNR":101,"GDENR":9,"GDENAME":"Mettmenstetten","GDENAMK":"Mettmenstetten","GDEBZNA":"Bezirk Affoltern"},
                "10": {"GDEBZNR":101,"GDENR":10,"GDENAME":"Obfelden","GDENAMK":"Obfelden","GDEBZNA":"Bezirk Affoltern"},
                "11": {"GDEBZNR":101,"GDENR":11,"GDENAME":"Ottenbach","GDENAMK":"Ottenbach","GDEBZNA":"Bezirk Affoltern"},
                "12": {"GDEBZNR":101,"GDENR":12,"GDENAME":"Rifferswil","GDENAMK":"Rifferswil","GDEBZNA":"Bezirk Affoltern"},
                "13": {"GDEBZNR":101,"GDENR":13,"GDENAME":"Stallikon","GDENAMK":"Stallikon","GDEBZNA":"Bezirk Affoltern"},
                "14": {"GDEBZNR":101,"GDENR":14,"GDENAME":"Wettswil am Albis","GDENAMK":"Wettswil am Albis","GDEBZNA":"Bezirk Affoltern"},
                "21": {"GDEBZNR":102,"GDENR":21,"GDENAME":"Adlikon","GDENAMK":"Adlikon","GDEBZNA":"Bezirk Andelfingen"},
                "22": {"GDEBZNR":102,"GDENR":22,"GDENAME":"Benken (ZH)","GDENAMK":"Benken (ZH)","GDEBZNA":"Bezirk Andelfingen"},
                "23": {"GDEBZNR":102,"GDENR":23,"GDENAME":"Berg am Irchel","GDENAMK":"Berg am Irchel","GDEBZNA":"Bezirk Andelfingen"},
                "24": {"GDEBZNR":102,"GDENR":24,"GDENAME":"Buch am Irchel","GDENAMK":"Buch am Irchel","GDEBZNA":"Bezirk Andelfingen"},
                "25": {"GDEBZNR":102,"GDENR":25,"GDENAME":"Dachsen","GDENAMK":"Dachsen","GDEBZNA":"Bezirk Andelfingen"},
                "26": {"GDEBZNR":102,"GDENR":26,"GDENAME":"Dorf","GDENAMK":"Dorf","GDEBZNA":"Bezirk Andelfingen"},
                "27": {"GDEBZNR":102,"GDENR":27,"GDENAME":"Feuerthalen","GDENAMK":"Feuerthalen","GDEBZNA":"Bezirk Andelfingen"},
                "28": {"GDEBZNR":102,"GDENR":28,"GDENAME":"Flaach","GDENAMK":"Flaach","GDEBZNA":"Bezirk Andelfingen"},
                "29": {"GDEBZNR":102,"GDENR":29,"GDENAME":"Flurlingen","GDENAMK":"Flurlingen","GDEBZNA":"Bezirk Andelfingen"},
                "30": {"GDEBZNR":102,"GDENR":30,"GDENAME":"Andelfingen","GDENAMK":"Andelfingen","GDEBZNA":"Bezirk Andelfingen"},
                "31": {"GDEBZNR":102,"GDENR":31,"GDENAME":"Henggart","GDENAMK":"Henggart","GDEBZNA":"Bezirk Andelfingen"},
                "32": {"GDEBZNR":102,"GDENR":32,"GDENAME":"Humlikon","GDENAMK":"Humlikon","GDEBZNA":"Bezirk Andelfingen"},
                "33": {"GDEBZNR":102,"GDENR":33,"GDENAME":"Kleinandelfingen","GDENAMK":"Kleinandelfingen","GDEBZNA":"Bezirk Andelfingen"},
                "34": {"GDEBZNR":102,"GDENR":34,"GDENAME":"Laufen-Uhwiesen","GDENAMK":"Laufen-Uhwiesen","GDEBZNA":"Bezirk Andelfingen"},
                "35": {"GDEBZNR":102,"GDENR":35,"GDENAME":"Marthalen","GDENAMK":"Marthalen","GDEBZNA":"Bezirk Andelfingen"},
                "36": {"GDEBZNR":102,"GDENR":36,"GDENAME":"Oberstammheim","GDENAMK":"Oberstammheim","GDEBZNA":"Bezirk Andelfingen"},
                "37": {"GDEBZNR":102,"GDENR":37,"GDENAME":"Ossingen","GDENAMK":"Ossingen","GDEBZNA":"Bezirk Andelfingen"},
                "38": {"GDEBZNR":102,"GDENR":38,"GDENAME":"Rheinau","GDENAMK":"Rheinau","GDEBZNA":"Bezirk Andelfingen"},
                "39": {"GDEBZNR":102,"GDENR":39,"GDENAME":"Thalheim an der Thur","GDENAMK":"Thalheim an der Thur","GDEBZNA":"Bezirk Andelfingen"},
                "40": {"GDEBZNR":102,"GDENR":40,"GDENAME":"Trüllikon","GDENAMK":"Trüllikon","GDEBZNA":"Bezirk Andelfingen"},
                "41": {"GDEBZNR":102,"GDENR":41,"GDENAME":"Truttikon","GDENAMK":"Truttikon","GDEBZNA":"Bezirk Andelfingen"},
                "42": {"GDEBZNR":102,"GDENR":42,"GDENAME":"Unterstammheim","GDENAMK":"Unterstammheim","GDEBZNA":"Bezirk Andelfingen"},
                "43": {"GDEBZNR":102,"GDENR":43,"GDENAME":"Volken","GDENAMK":"Volken","GDEBZNA":"Bezirk Andelfingen"},
                "44": {"GDEBZNR":102,"GDENR":44,"GDENAME":"Waltalingen","GDENAMK":"Waltalingen","GDEBZNA":"Bezirk Andelfingen"},
                "51": {"GDEBZNR":103,"GDENR":51,"GDENAME":"Bachenbülach","GDENAMK":"Bachenbülach","GDEBZNA":"Bezirk Bülach"},
                "52": {"GDEBZNR":103,"GDENR":52,"GDENAME":"Bassersdorf","GDENAMK":"Bassersdorf","GDEBZNA":"Bezirk Bülach"},
                "53": {"GDEBZNR":103,"GDENR":53,"GDENAME":"Bülach","GDENAMK":"Bülach","GDEBZNA":"Bezirk Bülach"},
                "54": {"GDEBZNR":103,"GDENR":54,"GDENAME":"Dietlikon","GDENAMK":"Dietlikon","GDEBZNA":"Bezirk Bülach"},
                "55": {"GDEBZNR":103,"GDENR":55,"GDENAME":"Eglisau","GDENAMK":"Eglisau","GDEBZNA":"Bezirk Bülach"},
                "56": {"GDEBZNR":103,"GDENR":56,"GDENAME":"Embrach","GDENAMK":"Embrach","GDEBZNA":"Bezirk Bülach"},
                "57": {"GDEBZNR":103,"GDENR":57,"GDENAME":"Freienstein-Teufen","GDENAMK":"Freienstein-Teufen","GDEBZNA":"Bezirk Bülach"},
                "58": {"GDEBZNR":103,"GDENR":58,"GDENAME":"Glattfelden","GDENAMK":"Glattfelden","GDEBZNA":"Bezirk Bülach"},
                "59": {"GDEBZNR":103,"GDENR":59,"GDENAME":"Hochfelden","GDENAMK":"Hochfelden","GDEBZNA":"Bezirk Bülach"},
                "60": {"GDEBZNR":103,"GDENR":60,"GDENAME":"Höri","GDENAMK":"Höri","GDEBZNA":"Bezirk Bülach"},
                "61": {"GDEBZNR":103,"GDENR":61,"GDENAME":"Hüntwangen","GDENAMK":"Hüntwangen","GDEBZNA":"Bezirk Bülach"},
                "62": {"GDEBZNR":103,"GDENR":62,"GDENAME":"Kloten","GDENAMK":"Kloten","GDEBZNA":"Bezirk Bülach"},
                "63": {"GDEBZNR":103,"GDENR":63,"GDENAME":"Lufingen","GDENAMK":"Lufingen","GDEBZNA":"Bezirk Bülach"},
                "64": {"GDEBZNR":103,"GDENR":64,"GDENAME":"Nürensdorf","GDENAMK":"Nürensdorf","GDEBZNA":"Bezirk Bülach"},
                "65": {"GDEBZNR":103,"GDENR":65,"GDENAME":"Oberembrach","GDENAMK":"Oberembrach","GDEBZNA":"Bezirk Bülach"},
                "66": {"GDEBZNR":103,"GDENR":66,"GDENAME":"Opfikon","GDENAMK":"Opfikon","GDEBZNA":"Bezirk Bülach"},
                "67": {"GDEBZNR":103,"GDENR":67,"GDENAME":"Rafz","GDENAMK":"Rafz","GDEBZNA":"Bezirk Bülach"},
                "68": {"GDEBZNR":103,"GDENR":68,"GDENAME":"Rorbas","GDENAMK":"Rorbas","GDEBZNA":"Bezirk Bülach"},
                "69": {"GDEBZNR":103,"GDENR":69,"GDENAME":"Wallisellen","GDENAMK":"Wallisellen","GDEBZNA":"Bezirk Bülach"},
                "70": {"GDEBZNR":103,"GDENR":70,"GDENAME":"Wasterkingen","GDENAMK":"Wasterkingen","GDEBZNA":"Bezirk Bülach"},
                "71": {"GDEBZNR":103,"GDENR":71,"GDENAME":"Wil (ZH)","GDENAMK":"Wil (ZH)","GDEBZNA":"Bezirk Bülach"},
                "72": {"GDEBZNR":103,"GDENR":72,"GDENAME":"Winkel","GDENAMK":"Winkel","GDEBZNA":"Bezirk Bülach"},
                "81": {"GDEBZNR":104,"GDENR":81,"GDENAME":"Bachs","GDENAMK":"Bachs","GDEBZNA":"Bezirk Dielsdorf"},
                "82": {"GDEBZNR":104,"GDENR":82,"GDENAME":"Boppelsen","GDENAMK":"Boppelsen","GDEBZNA":"Bezirk Dielsdorf"},
                "83": {"GDEBZNR":104,"GDENR":83,"GDENAME":"Buchs (ZH)","GDENAMK":"Buchs (ZH)","GDEBZNA":"Bezirk Dielsdorf"},
                "84": {"GDEBZNR":104,"GDENR":84,"GDENAME":"Dällikon","GDENAMK":"Dällikon","GDEBZNA":"Bezirk Dielsdorf"},
                "85": {"GDEBZNR":104,"GDENR":85,"GDENAME":"Dänikon","GDENAMK":"Dänikon","GDEBZNA":"Bezirk Dielsdorf"},
                "86": {"GDEBZNR":104,"GDENR":86,"GDENAME":"Dielsdorf","GDENAMK":"Dielsdorf","GDEBZNA":"Bezirk Dielsdorf"},
                "87": {"GDEBZNR":104,"GDENR":87,"GDENAME":"Hüttikon","GDENAMK":"Hüttikon","GDEBZNA":"Bezirk Dielsdorf"},
                "88": {"GDEBZNR":104,"GDENR":88,"GDENAME":"Neerach","GDENAMK":"Neerach","GDEBZNA":"Bezirk Dielsdorf"},
                "89": {"GDEBZNR":104,"GDENR":89,"GDENAME":"Niederglatt","GDENAMK":"Niederglatt","GDEBZNA":"Bezirk Dielsdorf"},
                "90": {"GDEBZNR":104,"GDENR":90,"GDENAME":"Niederhasli","GDENAMK":"Niederhasli","GDEBZNA":"Bezirk Dielsdorf"},
                "91": {"GDEBZNR":104,"GDENR":91,"GDENAME":"Niederweningen","GDENAMK":"Niederweningen","GDEBZNA":"Bezirk Dielsdorf"},
                "92": {"GDEBZNR":104,"GDENR":92,"GDENAME":"Oberglatt","GDENAMK":"Oberglatt","GDEBZNA":"Bezirk Dielsdorf"},
                "93": {"GDEBZNR":104,"GDENR":93,"GDENAME":"Oberweningen","GDENAMK":"Oberweningen","GDEBZNA":"Bezirk Dielsdorf"},
                "94": {"GDEBZNR":104,"GDENR":94,"GDENAME":"Otelfingen","GDENAMK":"Otelfingen","GDEBZNA":"Bezirk Dielsdorf"},
                "95": {"GDEBZNR":104,"GDENR":95,"GDENAME":"Regensberg","GDENAMK":"Regensberg","GDEBZNA":"Bezirk Dielsdorf"},
                "96": {"GDEBZNR":104,"GDENR":96,"GDENAME":"Regensdorf","GDENAMK":"Regensdorf","GDEBZNA":"Bezirk Dielsdorf"},
                "97": {"GDEBZNR":104,"GDENR":97,"GDENAME":"Rümlang","GDENAMK":"Rümlang","GDEBZNA":"Bezirk Dielsdorf"},
                "98": {"GDEBZNR":104,"GDENR":98,"GDENAME":"Schleinikon","GDENAMK":"Schleinikon","GDEBZNA":"Bezirk Dielsdorf"},
                "99": {"GDEBZNR":104,"GDENR":99,"GDENAME":"Schöfflisdorf","GDENAMK":"Schöfflisdorf","GDEBZNA":"Bezirk Dielsdorf"},
                "100": {"GDEBZNR":104,"GDENR":100,"GDENAME":"Stadel","GDENAMK":"Stadel","GDEBZNA":"Bezirk Dielsdorf"},
                "101": {"GDEBZNR":104,"GDENR":101,"GDENAME":"Steinmaur","GDENAMK":"Steinmaur","GDEBZNA":"Bezirk Dielsdorf"},
                "102": {"GDEBZNR":104,"GDENR":102,"GDENAME":"Weiach","GDENAMK":"Weiach","GDEBZNA":"Bezirk Dielsdorf"},
                "111": {"GDEBZNR":105,"GDENR":111,"GDENAME":"Bäretswil","GDENAMK":"Bäretswil","GDEBZNA":"Bezirk Hinwil"},
                "112": {"GDEBZNR":105,"GDENR":112,"GDENAME":"Bubikon","GDENAMK":"Bubikon","GDEBZNA":"Bezirk Hinwil"},
                "113": {"GDEBZNR":105,"GDENR":113,"GDENAME":"Dürnten","GDENAMK":"Dürnten","GDEBZNA":"Bezirk Hinwil"},
                "114": {"GDEBZNR":105,"GDENR":114,"GDENAME":"Fischenthal","GDENAMK":"Fischenthal","GDEBZNA":"Bezirk Hinwil"},
                "115": {"GDEBZNR":105,"GDENR":115,"GDENAME":"Gossau (ZH)","GDENAMK":"Gossau (ZH)","GDEBZNA":"Bezirk Hinwil"},
                "116": {"GDEBZNR":105,"GDENR":116,"GDENAME":"Grüningen","GDENAMK":"Grüningen","GDEBZNA":"Bezirk Hinwil"},
                "117": {"GDEBZNR":105,"GDENR":117,"GDENAME":"Hinwil","GDENAMK":"Hinwil","GDEBZNA":"Bezirk Hinwil"},
                "118": {"GDEBZNR":105,"GDENR":118,"GDENAME":"Rüti (ZH)","GDENAMK":"Rüti (ZH)","GDEBZNA":"Bezirk Hinwil"},
                "119": {"GDEBZNR":105,"GDENR":119,"GDENAME":"Seegräben","GDENAMK":"Seegräben","GDEBZNA":"Bezirk Hinwil"},
                "120": {"GDEBZNR":105,"GDENR":120,"GDENAME":"Wald (ZH)","GDENAMK":"Wald (ZH)","GDEBZNA":"Bezirk Hinwil"},
                "121": {"GDEBZNR":105,"GDENR":121,"GDENAME":"Wetzikon (ZH)","GDENAMK":"Wetzikon (ZH)","GDEBZNA":"Bezirk Hinwil"},
                "131": {"GDEBZNR":106,"GDENR":131,"GDENAME":"Adliswil","GDENAMK":"Adliswil","GDEBZNA":"Bezirk Horgen"},
                "132": {"GDEBZNR":106,"GDENR":132,"GDENAME":"Hirzel","GDENAMK":"Hirzel","GDEBZNA":"Bezirk Horgen"},
                "133": {"GDEBZNR":106,"GDENR":133,"GDENAME":"Horgen","GDENAMK":"Horgen","GDEBZNA":"Bezirk Horgen"},
                "134": {"GDEBZNR":106,"GDENR":134,"GDENAME":"Hütten","GDENAMK":"Hütten","GDEBZNA":"Bezirk Horgen"},
                "135": {"GDEBZNR":106,"GDENR":135,"GDENAME":"Kilchberg (ZH)","GDENAMK":"Kilchberg (ZH)","GDEBZNA":"Bezirk Horgen"},
                "136": {"GDEBZNR":106,"GDENR":136,"GDENAME":"Langnau am Albis","GDENAMK":"Langnau am Albis","GDEBZNA":"Bezirk Horgen"},
                "137": {"GDEBZNR":106,"GDENR":137,"GDENAME":"Oberrieden","GDENAMK":"Oberrieden","GDEBZNA":"Bezirk Horgen"},
                "138": {"GDEBZNR":106,"GDENR":138,"GDENAME":"Richterswil","GDENAMK":"Richterswil","GDEBZNA":"Bezirk Horgen"},
                "139": {"GDEBZNR":106,"GDENR":139,"GDENAME":"Rüschlikon","GDENAMK":"Rüschlikon","GDEBZNA":"Bezirk Horgen"},
                "140": {"GDEBZNR":106,"GDENR":140,"GDENAME":"Schönenberg (ZH)","GDENAMK":"Schönenberg (ZH)","GDEBZNA":"Bezirk Horgen"},
                "141": {"GDEBZNR":106,"GDENR":141,"GDENAME":"Thalwil","GDENAMK":"Thalwil","GDEBZNA":"Bezirk Horgen"},
                "142": {"GDEBZNR":106,"GDENR":142,"GDENAME":"Wädenswil","GDENAMK":"Wädenswil","GDEBZNA":"Bezirk Horgen"},
                "151": {"GDEBZNR":107,"GDENR":151,"GDENAME":"Erlenbach (ZH)","GDENAMK":"Erlenbach (ZH)","GDEBZNA":"Bezirk Meilen"},
                "152": {"GDEBZNR":107,"GDENR":152,"GDENAME":"Herrliberg","GDENAMK":"Herrliberg","GDEBZNA":"Bezirk Meilen"},
                "153": {"GDEBZNR":107,"GDENR":153,"GDENAME":"Hombrechtikon","GDENAMK":"Hombrechtikon","GDEBZNA":"Bezirk Meilen"},
                "154": {"GDEBZNR":107,"GDENR":154,"GDENAME":"Küsnacht (ZH)","GDENAMK":"Küsnacht (ZH)","GDEBZNA":"Bezirk Meilen"},
                "155": {"GDEBZNR":107,"GDENR":155,"GDENAME":"Männedorf","GDENAMK":"Männedorf","GDEBZNA":"Bezirk Meilen"},
                "156": {"GDEBZNR":107,"GDENR":156,"GDENAME":"Meilen","GDENAMK":"Meilen","GDEBZNA":"Bezirk Meilen"},
                "157": {"GDEBZNR":107,"GDENR":157,"GDENAME":"Oetwil am See","GDENAMK":"Oetwil am See","GDEBZNA":"Bezirk Meilen"},
                "158": {"GDEBZNR":107,"GDENR":158,"GDENAME":"Stäfa","GDENAMK":"Stäfa","GDEBZNA":"Bezirk Meilen"},
                "159": {"GDEBZNR":107,"GDENR":159,"GDENAME":"Uetikon am See","GDENAMK":"Uetikon am See","GDEBZNA":"Bezirk Meilen"},
                "160": {"GDEBZNR":107,"GDENR":160,"GDENAME":"Zumikon","GDENAMK":"Zumikon","GDEBZNA":"Bezirk Meilen"},
                "161": {"GDEBZNR":107,"GDENR":161,"GDENAME":"Zollikon","GDENAMK":"Zollikon","GDEBZNA":"Bezirk Meilen"},
                "171": {"GDEBZNR":108,"GDENR":171,"GDENAME":"Bauma","GDENAMK":"Bauma","GDEBZNA":"Bezirk Pfäffikon"},
                "172": {"GDEBZNR":108,"GDENR":172,"GDENAME":"Fehraltorf","GDENAMK":"Fehraltorf","GDEBZNA":"Bezirk Pfäffikon"},
                "173": {"GDEBZNR":108,"GDENR":173,"GDENAME":"Hittnau","GDENAMK":"Hittnau","GDEBZNA":"Bezirk Pfäffikon"},
                "174": {"GDEBZNR":108,"GDENR":174,"GDENAME":"Illnau-Effretikon","GDENAMK":"Illnau-Effretikon","GDEBZNA":"Bezirk Pfäffikon"},
                "175": {"GDEBZNR":108,"GDENR":175,"GDENAME":"Kyburg","GDENAMK":"Kyburg","GDEBZNA":"Bezirk Pfäffikon"},
                "176": {"GDEBZNR":108,"GDENR":176,"GDENAME":"Lindau","GDENAMK":"Lindau","GDEBZNA":"Bezirk Pfäffikon"},
                "177": {"GDEBZNR":108,"GDENR":177,"GDENAME":"Pfäffikon","GDENAMK":"Pfäffikon","GDEBZNA":"Bezirk Pfäffikon"},
                "178": {"GDEBZNR":108,"GDENR":178,"GDENAME":"Russikon","GDENAMK":"Russikon","GDEBZNA":"Bezirk Pfäffikon"},
                "179": {"GDEBZNR":108,"GDENR":179,"GDENAME":"Sternenberg","GDENAMK":"Sternenberg","GDEBZNA":"Bezirk Pfäffikon"},
                "180": {"GDEBZNR":108,"GDENR":180,"GDENAME":"Weisslingen","GDENAMK":"Weisslingen","GDEBZNA":"Bezirk Pfäffikon"},
                "181": {"GDEBZNR":108,"GDENR":181,"GDENAME":"Wila","GDENAMK":"Wila","GDEBZNA":"Bezirk Pfäffikon"},
                "182": {"GDEBZNR":108,"GDENR":182,"GDENAME":"Wildberg","GDENAMK":"Wildberg","GDEBZNA":"Bezirk Pfäffikon"},
                "191": {"GDEBZNR":109,"GDENR":191,"GDENAME":"Dübendorf","GDENAMK":"Dübendorf","GDEBZNA":"Bezirk Uster"},
                "192": {"GDEBZNR":109,"GDENR":192,"GDENAME":"Egg","GDENAMK":"Egg","GDEBZNA":"Bezirk Uster"},
                "193": {"GDEBZNR":109,"GDENR":193,"GDENAME":"Fällanden","GDENAMK":"Fällanden","GDEBZNA":"Bezirk Uster"},
                "194": {"GDEBZNR":109,"GDENR":194,"GDENAME":"Greifensee","GDENAMK":"Greifensee","GDEBZNA":"Bezirk Uster"},
                "195": {"GDEBZNR":109,"GDENR":195,"GDENAME":"Maur","GDENAMK":"Maur","GDEBZNA":"Bezirk Uster"},
                "196": {"GDEBZNR":109,"GDENR":196,"GDENAME":"Mönchaltorf","GDENAMK":"Mönchaltorf","GDEBZNA":"Bezirk Uster"},
                "197": {"GDEBZNR":109,"GDENR":197,"GDENAME":"Schwerzenbach","GDENAMK":"Schwerzenbach","GDEBZNA":"Bezirk Uster"},
                "198": {"GDEBZNR":109,"GDENR":198,"GDENAME":"Uster","GDENAMK":"Uster","GDEBZNA":"Bezirk Uster"},
                "199": {"GDEBZNR":109,"GDENR":199,"GDENAME":"Volketswil","GDENAMK":"Volketswil","GDEBZNA":"Bezirk Uster"},
                "200": {"GDEBZNR":109,"GDENR":200,"GDENAME":"Wangen-Brüttisellen","GDENAMK":"Wangen-Brüttisellen","GDEBZNA":"Bezirk Uster"},
                "211": {"GDEBZNR":110,"GDENR":211,"GDENAME":"Altikon","GDENAMK":"Altikon","GDEBZNA":"Bezirk Winterthur"},
                "213": {"GDEBZNR":110,"GDENR":213,"GDENAME":"Brütten","GDENAMK":"Brütten","GDEBZNA":"Bezirk Winterthur"},
                "214": {"GDEBZNR":110,"GDENR":214,"GDENAME":"Dägerlen","GDENAMK":"Dägerlen","GDEBZNA":"Bezirk Winterthur"},
                "215": {"GDEBZNR":110,"GDENR":215,"GDENAME":"Dättlikon","GDENAMK":"Dättlikon","GDEBZNA":"Bezirk Winterthur"},
                "216": {"GDEBZNR":110,"GDENR":216,"GDENAME":"Dinhard","GDENAMK":"Dinhard","GDEBZNA":"Bezirk Winterthur"},
                "217": {"GDEBZNR":110,"GDENR":217,"GDENAME":"Elgg","GDENAMK":"Elgg","GDEBZNA":"Bezirk Winterthur"},
                "218": {"GDEBZNR":110,"GDENR":218,"GDENAME":"Ellikon an der Thur","GDENAMK":"Ellikon an der Thur","GDEBZNA":"Bezirk Winterthur"},
                "219": {"GDEBZNR":110,"GDENR":219,"GDENAME":"Elsau","GDENAMK":"Elsau","GDEBZNA":"Bezirk Winterthur"},
                "220": {"GDEBZNR":110,"GDENR":220,"GDENAME":"Hagenbuch","GDENAMK":"Hagenbuch","GDEBZNA":"Bezirk Winterthur"},
                "221": {"GDEBZNR":110,"GDENR":221,"GDENAME":"Hettlingen","GDENAMK":"Hettlingen","GDEBZNA":"Bezirk Winterthur"},
                "222": {"GDEBZNR":110,"GDENR":222,"GDENAME":"Hofstetten (ZH)","GDENAMK":"Hofstetten (ZH)","GDEBZNA":"Bezirk Winterthur"},
                "223": {"GDEBZNR":110,"GDENR":223,"GDENAME":"Neftenbach","GDENAMK":"Neftenbach","GDEBZNA":"Bezirk Winterthur"},
                "224": {"GDEBZNR":110,"GDENR":224,"GDENAME":"Pfungen","GDENAMK":"Pfungen","GDEBZNA":"Bezirk Winterthur"},
                "225": {"GDEBZNR":110,"GDENR":225,"GDENAME":"Rickenbach (ZH)","GDENAMK":"Rickenbach (ZH)","GDEBZNA":"Bezirk Winterthur"},
                "226": {"GDEBZNR":110,"GDENR":226,"GDENAME":"Schlatt (ZH)","GDENAMK":"Schlatt (ZH)","GDEBZNA":"Bezirk Winterthur"},
                "227": {"GDEBZNR":110,"GDENR":227,"GDENAME":"Seuzach","GDENAMK":"Seuzach","GDEBZNA":"Bezirk Winterthur"},
                "228": {"GDEBZNR":110,"GDENR":228,"GDENAME":"Turbenthal","GDENAMK":"Turbenthal","GDEBZNA":"Bezirk Winterthur"},
                "230": {"GDEBZNR":110,"GDENR":230,"GDENAME":"Winterthur","GDENAMK":"Winterthur","GDEBZNA":"Bezirk Winterthur"},
                "231": {"GDEBZNR":110,"GDENR":231,"GDENAME":"Zell (ZH)","GDENAMK":"Zell (ZH)","GDEBZNA":"Bezirk Winterthur"},
                "241": {"GDEBZNR":111,"GDENR":241,"GDENAME":"Aesch (ZH)","GDENAMK":"Aesch (ZH)","GDEBZNA":"Bezirk Dietikon"},
                "242": {"GDEBZNR":111,"GDENR":242,"GDENAME":"Birmensdorf (ZH)","GDENAMK":"Birmensdorf (ZH)","GDEBZNA":"Bezirk Dietikon"},
                "243": {"GDEBZNR":111,"GDENR":243,"GDENAME":"Dietikon","GDENAMK":"Dietikon","GDEBZNA":"Bezirk Dietikon"},
                "244": {"GDEBZNR":111,"GDENR":244,"GDENAME":"Geroldswil","GDENAMK":"Geroldswil","GDEBZNA":"Bezirk Dietikon"},
                "245": {"GDEBZNR":111,"GDENR":245,"GDENAME":"Oberengstringen","GDENAMK":"Oberengstringen","GDEBZNA":"Bezirk Dietikon"},
                "246": {"GDEBZNR":111,"GDENR":246,"GDENAME":"Oetwil an der Limmat","GDENAMK":"Oetwil an der Limmat","GDEBZNA":"Bezirk Dietikon"},
                "247": {"GDEBZNR":111,"GDENR":247,"GDENAME":"Schlieren","GDENAMK":"Schlieren","GDEBZNA":"Bezirk Dietikon"},
                "248": {"GDEBZNR":111,"GDENR":248,"GDENAME":"Uitikon","GDENAMK":"Uitikon","GDEBZNA":"Bezirk Dietikon"},
                "249": {"GDEBZNR":111,"GDENR":249,"GDENAME":"Unterengstringen","GDENAMK":"Unterengstringen","GDEBZNA":"Bezirk Dietikon"},
                "250": {"GDEBZNR":111,"GDENR":250,"GDENAME":"Urdorf","GDENAMK":"Urdorf","GDEBZNA":"Bezirk Dietikon"},
                "251": {"GDEBZNR":111,"GDENR":251,"GDENAME":"Weiningen (ZH)","GDENAMK":"Weiningen (ZH)","GDEBZNA":"Bezirk Dietikon"},
                "261": {"GDEBZNR":112,"GDENR":261,"GDENAME":"Zürich","GDENAMK":"Zürich","GDEBZNA":"Bezirk Zürich"}
            };

            service.getGemeindeInfo = function (gemeindeId) {
                return gemeindenr_zh[''+gemeindeId];
            };
            service.getGemeindeList = function () {
                return gemeindenr_zh;
            };

            return service;
        }]);

}());
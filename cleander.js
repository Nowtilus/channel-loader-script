import fetch from "node-fetch";

const medias = ["Cyber Vaar_30Sec_Video_3June","20446","https://mercury.akamaized.net/v/f132879ffc1382aa7cd064df9e0e6a07_11659_0.mp4"],["CyberVaar_10Sec_Video_3June","20437","https://mercury.akamaized.net/v/1e1a6aed0229a1772684796a7b99c054_11659_0.mp4"],["VA_JioPhone_SMS","7860","https://mercury.akamaized.net/v/a64506ba8d3e5ccfff6d493438bc53ad_6219_0.mp4"],["VA_JioPhone_ContentSearch","7863","https://mercury.akamaized.net/v/4ea1e6990c1eadb84b5f377923fc081b_6219_0.mp4"],["VA_JioPhone_Call","7866","https://mercury.akamaized.net/v/12fc992a484fe7dc65449da25f559e50_6219_0.mp4"],["VOOT_KAUSHIKI_TRAILER_WD_30_SEC","19204","https://mercury.akamaized.net/v/13e330700659224f1e32932b8f3a493a_11254_0.mp4"],["VOOT_KAUSHIKI_TRAILER_WD_10_SEC","19201","https://mercury.akamaized.net/v/52d2d8ebd5ce35ee39da4cb81e945f72_11254_0.mp4"],["VOOT_PFA_S-1S-S2_COMPOSITE_30SEC","19975","https://mercury.akamaized.net/v/40c5aadfa5ee0db42f8f330ba2000ed9_11473_0.mp4"],["VOOT_PFA_S-1S-S2_COMPOSITE_10SEC","19972","https://mercury.akamaized.net/v/9fe001814cd634c52afaee387ff06b41_11473_0.mp4"],["JioJoin Ad 1","7815","https://mercury.akamaized.net/v/4ec237028416e677e99a2b0ab769694d_6192_0.mp4"],["JioJoin Ad 2","7812","https://mercury.akamaized.net/v/590b7690b9249939e4c5797be90c9dd9_6192_0.mp4"],["JioJoin Ad 3","7809","https://mercury.akamaized.net/v/c4eae460d4331af9ebac929b70a9cb4b_6192_0.mp4"],["JioPages - Made In India","18037","https://mercury.akamaized.net/v/261a44efe24463e25b0007e7d4091c2c_10801_0.mp4"],["Search and scan_01032022_143721","9981","https://mercury.akamaized.net/v/1c615acd174f8a37a300b6f0c0aaeb96_6186_0.mp4"],["Secure Incognito_01032022_143721","9984","https://mercury.akamaized.net/v/d25dc11f87025e0a7bb2717f7db31209_6186_0.mp4"],["News Feed_01032022_143721","9978","https://mercury.akamaized.net/v/5e96f8d2812a463ae75f701d43b8ed53_6186_0.mp4"],["Feature videos_01032022_143721","9975","https://mercury.akamaized.net/v/7fcd95c516b17e3528dace75d9601915_6186_0.mp4"],["Endless entertainment_01032022_143721","9972","https://mercury.akamaized.net/v/bbad3e2b405d52a3dd5467d8764198b6_6186_0.mp4"],["Customized Home screen_01032022_143721","9969","https://mercury.akamaized.net/v/e99a31a6e7e107d8b94ecc281a67f7a0_6186_0.mp4"],["TimeOut_10Sec_Video_Promo","18535","https://mercury.akamaized.net/v/49b24be1c0de97a5e471f1346f29f940_11008_0.mp4"],["TimeOut_30Sec_Video_Promo","18538","https://mercury.akamaized.net/v/511ca2273c70dc13526034b01d029b0b_11008_0.mp4"],["Baked_S3_30Sec_Video","17269","https://mercury.akamaized.net/v/ad00e5f9f15c51c154359dc6c53f7813_10531_0.mp4"],["Baked_S3_Video_10Sec","17266","https://mercury.akamaized.net/v/2126e781765b835d25d1ee1037b7d031_10531_0.mp4"],["U-Turn_18Sec_Video","21169","https://mercury.akamaized.net/v/5ac6237fbbe63c1be5a0443e46fb2141_11518_0.mp4"],["AP_Laundry_20Sec_7March","21130","https://mercury.akamaized.net/v/e94a9f14d729c234fb4acd6048b57ec7_5091_0.mp4"],["UP_Laundry_20Sec_7March","21124","https://mercury.akamaized.net/v/f1d610ec68435e92dc6251efb07da5a7_5091_0.mp4"],["MH_Laundry_20Sec_7March","21127","https://mercury.akamaized.net/v/935955218b01527d088f7ede611edf0c_5091_0.mp4"],["PCO_10sec_June_KA_IP","11968","https://mercury.akamaized.net/v/b69ff2a69d2271b0cfcbda6b09fedbbb_11968_0.mp4"],["PCO_10sec_June_AP-TS_IP","11977","https://mercury.akamaized.net/v/d8e33888f45fee10aa70da4218a903cf_11977_0.mp4"],["PCO_10sec_June_KL_IP","11983","https://mercury.akamaized.net/v/a3e03c5967b5250b09e8fb9790e68585_11983_0.mp4"],["Vimal_20Sec_Video_8June","21154","https://mercury.akamaized.net/v/2818ff72b6140ed31a218d38c769eca9_0_20494.mp4"],["cluster3","21133","https://mercury.akamaized.net/v/2d0099ebaa4da8c95f25f0e4ab5f72f1_11482_0.mp4"],["Cluster2","21136","https://mercury.akamaized.net/v/bf55fd09328f70b90045ddf255542844_11482_0.mp4"],["Android_Video_20May_1","21157","https://mercury.akamaized.net/v/f1d082986c87d19993e2aa966fe56279_0_18748.mp4"],["Android_Video_20May_2","21160","https://mercury.akamaized.net/v/df00e7f0b8eac5c1e556e719d74ba586_0_18754.mp4"],["Android_Video_20May_4","21163","https://mercury.akamaized.net/v/c0e97e90a8eb5d3ffb0243e3c51064d2_0_18760.mp4"],["Android_Video_20May_3","21166","https://mercury.akamaized.net/v/5daa4f5609be7f088aa39446d880122e_0_18766.mp4"],["UTI MF_Video_14Sec_8Jun","21175","https://mercury.akamaized.net/v/e8b3eefcbd89ed619c5ac30a93521ec6_10675_0.mp4"],["Tata Tea_UP_City_10Sec_Jun22","21178","https://mercury.akamaized.net/v/abec9618afb307bd7a7840e2fe09ecaf_10864_0.mp4"],["Tata Tea_UP_10Sec_Jun22","21181","https://mercury.akamaized.net/v/abec9618afb307bd7a7840e2fe09ecaf_10864_0.mp4"]

async function run () {
  for (const media of medias) {
    const url = media.url
  }
}

run()
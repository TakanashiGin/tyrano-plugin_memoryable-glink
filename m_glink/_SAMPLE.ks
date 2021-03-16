; サンプル用マクロ
[macro name="cl"][eval exp="console.log(mp.val)"][endmacro]

[layopt layer="message" visible="false"]

[plugin name="m_glink"]

*return
[cm][clearstack]

[cl val="クリックで次へ進む"]
[p]

[m_glink name="glink_1" text_1="ボタン１" text_2="ボタン１（選択済み）" target_1="l1" color_1="white" x_1="100" y_1="100"]
[m_glink name="glink_2" text_1="ボタン２" text_2="ボタン２（選択済み）" target_1="l2" target_2="l3" color_1="white" x_1="100" y_1="300"]
[s]

*l1
[cl val="ラベル１"]
[jump target="common"]
[s]

*l2
[cl val="ラベル２"]
[jump target="common"]
[s]

*l3
[cl val="ラベル３"]
[jump target="common"]
[s]

*common
[jump target="return"]
[s]
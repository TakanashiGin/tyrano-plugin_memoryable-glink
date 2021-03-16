(function(){

    // スコープを確保
    const TG = tyrano.plugin.kag;
    const f = TG.stat.f;
    const sf = TG.variable.sf;
    const tf = TG.variable.tf;
    const mp = TG.stat.mp;

    // m_glink 用のオブジェクトを確保
    const variable = mp.var || "sf.memoryable_glink";

    // m_glink 用のオブジェクトを用意
    // m_glinkに var を用意しているのはオブジェクトを分ける場合に対応するため
    eval(`${variable} = {};`);

    // 元の glink の pm からコピー
    const origin_glink_pm = TG.tag.glink.pm;
    const m_glink_pm = {};
    for (let p in origin_glink_pm) {
        if (p !== "name") {
            m_glink_pm[`${p}_1`] = origin_glink_pm[p];  // 選択前
            m_glink_pm[`${p}_2`] = "";  // 選択後
        }
    }
    m_glink_pm.name = "";  // name属性は選択前・後で共通
    m_glink_pm.var = "";
    m_glink_pm.exp_1 = "";
    m_glink_pm.exp_2 = "";

    // タグ定義
    TG.tag.m_glink = {

        vital: ["name"],

        pm: m_glink_pm,

        start: function(pm){

            // name属性がなければ即時終了
            if (!pm.name) {
                console.error("[m_glink] name属性が正しく指定されていません。");
                return false;
            }

            // m_glink用オブジェクトを確保
            const obj = !!pm.var? eval(`${pm.var} = ${pm.var} || {}`) : eval(variable);

            // 名前が重複していたら警告を返す
            if (Object.keys(obj).filter(v => v === pm.name).length > 0) {
                console.warn(`[m_glink] ${pm.name}は既に登録されています。name属性の重複は出来ません。`)
            }

            // 選択判定を取得ないしは初期化
            obj[pm.name] = obj[pm.name] || false;

            // glinkに渡すパラメーターを確定する
            const param = object(origin_glink_pm);
            for (let p in origin_glink_pm) {
                if (p !== "name") {
                    param[p] = !obj[pm.name] || !pm[`${p}_2`]? pm[`${p}_1`] : pm[`${p}_2`];
                }
            }
            param.name = pm.name;
            if (!obj[pm.name]) param.exp = `${pm.var || variable}.${pm.name} = true`;

            // glink実行
            TG.ftag.startTag("glink", param);

        }

    };

    // タグ情報をmaster_tagに格納
    TG.ftag.master_tag.m_glink = object(TG.tag.m_glink);
    TG.ftag.master_tag.m_glink.kag = TG;

}());
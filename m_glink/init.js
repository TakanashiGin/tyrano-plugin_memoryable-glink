(function(){

    // スコープを確保
    const TG = tyrano.plugin.kag;
    const f = TG.stat.f;
    const sf = TG.variable.sf;
    const tf = TG.variable.tf;
    const mp = TG.stat.mp;

    // m_glink 用のオブジェクトを確保
    if (!mp.var) mp.var = "sf.memoryable_glink";
    const variable = mp.var;

    // m_glink 用のオブジェクトを用意
    // m_glinkに var を用意しているのはオブジェクトを分ける場合に対応するため
    eval(`${variable} = {};`);

    // 元の glink の pm からコピー
    const origin_glink_pm = TG.tag.glink.pm;
    const m_glink_pm = {};
    for (let p in origin_glink_pm) {
        if (p !== "name") {
            m_glink_pm[`${p}_1`] = "";  // 選択前
            m_glink_pm[`${p}_2`] = "";  // 選択後
        }
    }
    m_glink_pm.name = "";  // name属性は選択前・後で共通
    m_glink_pm.var = "";
    m_glink_pm.exp_1 = "";
    m_glink_pm.exp_2 = "";
    m_glink_pm.size_1 = 30;

    // タグ定義
    TG.tag.m_glink = {

        vital: ["name"],

        pm: m_glink_pm,

        start: function(pm){

            console.log(pm);

            // name属性がなければ即時終了
            if (!pm.name) {
                console.error("[m_glink] name属性が正しく指定されていません。");
                return false;
            }

            // m_glink用オブジェクトを確保
            const obj = !!pm.var? eval(`${pm.var} = ${pm.var} || {}`) : eval(variable);

            // 名前が重複していたらエラーを返す
            if (Object.keys(obj).filter(v => v === pm.name).length >= 2) {
                console.error(`[m_glink] ${pm.name}は既に登録されています。name属性の重複は出来ません。`)
                return false;
            } else {
                if (!obj[pm.name]) {
                    obj[pm.name] = false;
                }
            }

            // glinkに渡すパラメーターを確定する
            const param = object(origin_glink_pm);
            for (let p in origin_glink_pm) {
                if (p !== "name") {
                    if (!obj[pm.name]) {
                        param[p] = pm[`${p}_1`];
                    } else {
                        param[p] = pm[`${p}_2`] || pm[`${p}_1`];
                    }
                }
            }
            param.name = pm.name;
            if (!obj[pm.name]) param.exp = `${pm.var || variable}.${pm.name} = true`;

            console.log(param);

            // glink実行
            TG.ftag.startTag("glink", param);

        }

    };

    // タグ情報をmaster_tagに格納
    TG.ftag.master_tag.m_glink = object(TG.tag.m_glink);
    TG.ftag.master_tag.m_glink.kag = TG;

}());
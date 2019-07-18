var sdkToken = "WHITEcGFydG5lcl9pZD0zZHlaZ1BwWUtwWVN2VDVmNGQ4UGI2M2djVGhncENIOXBBeTcmc2lnPTE1ZjQyMTIxMWViMjQzMjhmODQ4MTU0OTU0NTE4NjJlYTU2NzFkYjc6YWRtaW5JZD0xNTgmcm9sZT1taW5pJmV4cGlyZV90aW1lPTE1OTQ5ODA4NzcmYWs9M2R5WmdQcFlLcFlTdlQ1ZjRkOFBiNjNnY1RoZ3BDSDlwQXk3JmNyZWF0ZV90aW1lPTE1NjM0MjM5MjUmbm9uY2U9MTU2MzQyMzkyNTA5NjAw";
var url = 'https://cloudcapiv4.herewhite.com/room?token=' + sdkToken;
var requestInit = {
    method: 'POST',
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify({
        name: '我的第一个 White 房间',
        limit: 100, // 房间人数限制
    }),
};
var roomObj;
// 请求创建房间
// 网络请求部分逻辑，请在服务器实现
fetch(url, requestInit).then(function(response) {
    // Step1: 服务器返回房间唯一标识 uuid 和 进入房间的秘钥 roomToken
    return response.json();
}).then(function(json) {
    // Step2: 加入房间
    console.log(json);
    const test = jionRoom(json)
    console.log(test);
    return test;
}).then(function(room) {
    // Step3: 加入成功后想白板绑定到指定的 dom 中
    roomObj = room;
    room.setMemberState({
        currentApplianceName: "rectangle",
    });

    bind(room);
}).catch(function(err) {
    console.log(err);
});
// 加入房间
function jionRoom (json) {
    try {
        // 初始化 SDK，初始化 SDK 的参数，仅对本地用户有效，默认可以不传
        var whiteWebSdk = new WhiteWebSdk({
            // 用户手动进行缩放操作时的上下限，默认 为 0.1~10。
            // 缩放 API 不受影响
            zoomMaxScale: 3,
            zoomMinScale: 0.3,
            // 图片替换 API，可以在插入图片和创建新场景背景图时，替换传入的 url。
            // 如果没有需要，请不要传入，可以减少前端资源开销
            // 使用该 API 后，服务器截屏时，会使用原始图片地址
            urlInterrupter: url => url,
        });
        return whiteWebSdk.joinRoom({
            // 这里与
            uuid: json.msg.room.uuid,
            roomToken: json.msg.roomToken,
        });
    } catch (err) {
        console.log(err);
    }
}

// 将白板绑定在一个元素上
function bind (room) {
    room.bindHtmlElement(document.getElementById('whiteboard'));
}

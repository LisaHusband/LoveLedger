// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract LoveChain {
    enum ConfessionStatus { Pending, Accepted, Rejected }
    enum MarriageStatus { Pending, Accepted, Rejected }

    struct Confession {
        string title;
        string message;
        address sender;
        address receiver;
        uint256 timestamp;
        ConfessionStatus status;
    }

    struct Marriage {
        address partnerA;
        address partnerB;
        uint256 timestamp;
        MarriageStatus status;
    }

    // 记录所有表白
    Confession[] public confessions;
    // 记录所有婚姻登记
    Marriage[] public marriages;

    event ConfessionSent(uint256 indexed confessionId, address indexed sender, address indexed receiver, string title, string message, uint256 timestamp);
    event ConfessionResponded(uint256 indexed confessionId, address indexed receiver, ConfessionStatus status);
    event MarriageProposed(uint256 indexed marriageId, address indexed partnerA, address indexed partnerB, uint256 timestamp);
    event MarriageResponded(uint256 indexed marriageId, address indexed partnerB, MarriageStatus status);

    // 发起表白，处于待接受状态
    function confess(address _to, string calldata _title, string calldata _message) external returns (uint256) {
        require(_to != msg.sender, "Cannot confess to yourself");
        Confession memory c = Confession({
            title: _title,
            message: _message,
            sender: msg.sender,
            receiver: _to,
            timestamp: block.timestamp,
            status: ConfessionStatus.Pending
        });
        confessions.push(c);
        uint256 confessionId = confessions.length - 1;
        emit ConfessionSent(confessionId, msg.sender, _to, _title, _message, block.timestamp);
        return confessionId;  // 返回 ID
    }

    // 发起婚姻登记，处于待接受状态
    function registerMarriage(address partner) external returns (uint256) {
        require(partner != msg.sender, "Cannot marry yourself");
        Marriage memory m = Marriage({
            partnerA: msg.sender,
            partnerB: partner,
            timestamp: block.timestamp,
            status: MarriageStatus.Pending
        });
        marriages.push(m);
        uint256 marriageId = marriages.length - 1;
        emit MarriageProposed(marriageId, msg.sender, partner, block.timestamp);
        return marriageId;  // 返回 ID
    }


    // 接收者处理表白，status只能为 Accepted 或 Rejected
    function respondConfession(uint256 confessionId, bool accept) external {
        require(confessionId < confessions.length, "Invalid confessionId");
        Confession storage c = confessions[confessionId];
        require(msg.sender == c.receiver, "Only receiver can respond");
        require(c.status == ConfessionStatus.Pending, "Already responded");

        c.status = accept ? ConfessionStatus.Accepted : ConfessionStatus.Rejected;
        emit ConfessionResponded(confessionId, msg.sender, c.status);
    }

    // 配偶响应婚姻申请
    function respondMarriage(uint256 marriageId, bool accept) external {
        require(marriageId < marriages.length, "Invalid marriageId");
        Marriage storage m = marriages[marriageId];
        require(msg.sender == m.partnerB, "Only partnerB can respond");
        require(m.status == MarriageStatus.Pending, "Already responded");

        m.status = accept ? MarriageStatus.Accepted : MarriageStatus.Rejected;
        emit MarriageResponded(marriageId, msg.sender, m.status);
    }

    // 查询发给某地址的所有表白（包括状态）
    function getConfessionsTo(address receiver) external view returns (Confession[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < confessions.length; i++) {
            if (confessions[i].receiver == receiver) {
                count++;
            }
        }
        Confession[] memory result = new Confession[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < confessions.length; i++) {
            if (confessions[i].receiver == receiver) {
                result[index++] = confessions[i];
            }
        }
        return result;
    }

    // 查询发起的婚姻记录
    function getMarriagesOf(address user) external view returns (Marriage[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < marriages.length; i++) {
            if (marriages[i].partnerA == user || marriages[i].partnerB == user) {
                count++;
            }
        }
        Marriage[] memory result = new Marriage[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < marriages.length; i++) {
            if (marriages[i].partnerA == user || marriages[i].partnerB == user) {
                result[index++] = marriages[i];
            }
        }
        return result;
    }

    // 计算爱情信用度：绝对值(|表白数-婚烟数|), 最小为0，最高信用，初始为1
    function getLoveCredit(address user) external view returns (uint256) {
        uint256 acceptedConfessions = 0;
        uint256 acceptedMarriages = 0;

        for (uint256 i = 0; i < confessions.length; i++) {
            Confession memory c = confessions[i];
            if ((c.sender == user || c.receiver == user) && c.status == ConfessionStatus.Accepted) {
                acceptedConfessions++;
            }
        }

        for (uint256 i = 0; i < marriages.length; i++) {
            Marriage memory m = marriages[i];
            if ((m.partnerA == user || m.partnerB == user) && m.status == MarriageStatus.Accepted) {
                acceptedMarriages++;
            }
        }

        // 默认没有记录时，信用度为1
        if (acceptedConfessions == 0 && acceptedMarriages == 0) {
            return 1;
        }

        if (acceptedConfessions > acceptedMarriages) {
            return acceptedConfessions - acceptedMarriages;
        } else if (acceptedMarriages > acceptedConfessions) {
            return acceptedMarriages - acceptedConfessions;
        } else {
            // 完美匹配，信用度最高，0为最高信用
            return 0;
        }
    }

}

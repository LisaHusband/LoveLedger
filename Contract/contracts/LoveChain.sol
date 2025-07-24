// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract LoveChain {
    struct LoveRecord {
        string title;
        string message;
        address sender;
        address receiver;
        uint256 timestamp;
    }

    LoveRecord[] public loveRecords;

    event LoveSent(address indexed sender, address indexed receiver, string title, string message, uint256 timestamp);
    event MarriageRegistered(address indexed partnerA, address indexed partnerB, uint256 timestamp);
    event LoyaltyUpdated(address indexed user, uint256 newScore);

    function confess(address _to, string calldata _title, string calldata _message) external {
        loveRecords.push(LoveRecord(_title, _message, msg.sender, _to, block.timestamp));
        emit LoveSent(msg.sender, _to, _title, _message, block.timestamp);
    }

    function registerMarriage(address partner) external {
        require(partner != msg.sender, "Cannot marry yourself");
        loveRecords.push(LoveRecord("Marriage", "Marriage Registered", msg.sender, partner, block.timestamp));
        emit MarriageRegistered(msg.sender, partner, block.timestamp);
    }

    function loyaltyInteraction(address partner) external {
        // Interaction logic
        emit LoyaltyUpdated(msg.sender, block.timestamp);
        emit LoyaltyUpdated(partner, block.timestamp);
    }

    function getAllConfessions() external view returns (LoveRecord[] memory) {
        return loveRecords;
    }
}

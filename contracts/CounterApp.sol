import "@aragon/os/contracts/lib/math/SafeMath.sol";


contract CounterApp {
    using SafeMath for uint256;

    /// Events
    event Increment(address indexed entity, uint256 step);
    event Decrement(address indexed entity, uint256 step);

    /// State
    uint256 public value;

    function increment(uint256 step) external {
        value = value.add(step);
        emit Increment(msg.sender, step);
    }

    function decrement(uint256 step) external {
        value = value.sub(step);
        emit Decrement(msg.sender, step);
    }
}
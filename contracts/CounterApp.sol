import "@aragon/os/contracts/lib/math/SafeMath.sol";
import "@aragon/os/contracts/apps/AragonApp.sol";

contract CounterApp is AragonApp {
    using SafeMath for uint256;

    /// Definiing roles to be made accessible by the app
    bytes32 constant public INCREMENT_ROLE = keccak256("INCREMENT_ROLE");
    bytes32 constant public DECREMENT_ROLE = keccak256("DECREMENT_ROLE");

    /// Events
    event Increment(address indexed entity, uint256 step);
    event Decrement(address indexed entity, uint256 step);

    /// State
    uint256 public value;

    function initialize(uint256 _initValue) public onlyInit {
        value = _initValue;

        initialized();
    }

    /// auth is a modifier defined in AragonApp.sol
    /// auth checks if the msg.sender has authority to perform certain actions
    function increment(uint256 step) auth(INCREMENT_ROLE) external {
        value = value.add(step);
        emit Increment(msg.sender, step);
    }

    function decrement(uint256 step) auth(DECREMENT_ROLE) external {
        value = value.sub(step);
        emit Decrement(msg.sender, step);
    }
}
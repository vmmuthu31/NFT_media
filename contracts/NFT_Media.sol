// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";

contract BasicCreate is ERC721Holder {
    // A mapping that holds `tableName` and its `tableId`
    mapping(string => uint256) public tables;
    // nterface to the `TablelandTables` registry contract
    ITablelandTables private _tableland;
    uint256 public tableId;
    string public tableName;

    constructor(address registry) {
        _tableland = ITablelandTables(registry);
    }

    function create_user_table() public payable {
        tableId = _tableland.createTable(
            address(this),
            /*
             *  CREATE TABLE {"user_table"}_{chainId} (
             *    id integer primary key,
             *    message text
             *  );
             */
            string.concat(
                "CREATE TABLE ",
                "user_table",
                "_",
                Strings.toString(block.chainid),
                " (id integer primary key,address text, comments text, views integer,share integer,follower integer,like integer,dislike integer,time text,date text);"
            )
        );

        tableName = string.concat(
            "user_table",
            "_",
            Strings.toString(block.chainid),
            "_",
            Strings.toString(tableId)
        );

        tables[tableName] = tableId;
    }

    function update_like(uint256 like_count, uint256 id) external payable {
        _tableland.runSQL(
            address(this),
            tableId,
            string.concat(
                "UPDATE ",
                tableName,
                " SET like = ",
                Strings.toString(like_count),
                "WHERE id = ",
                Strings.toString(id)
            )
        );
    }

    function update_dislike(uint256 dislike_count, uint256 id)
        external
        payable
    {
        _tableland.runSQL(
            address(this),
            tableId,
            string.concat(
                "UPDATE ",
                tableName,
                " SET dislike = ",
                Strings.toString(dislike_count),
                "WHERE id = ",
                Strings.toString(id)
            )
        );
    }

    function update_share(uint256 share_count, uint256 id) external payable {
        _tableland.runSQL(
            address(this),
            tableId,
            string.concat(
                "UPDATE ",
                tableName,
                " SET like = ",
                Strings.toString(share_count),
                "WHERE id = ",
                Strings.toString(id)
            )
        );
    }

    function insert(
        uint256 id,
        string memory comments,
        uint256 views,
        uint256 share,
        uint256 follower,
        uint256 like,
        uint256 dislike,
        string memory time,
        string memory date
    ) public payable {
        _tableland.runSQL(
            address(this),
            tableId,
            string.concat(
                "INSERT INTO ",
                tableName,
                " (id, address,comments,views,share,follower,like,dislike,time,date) VALUES ( ",
                Strings.toString(id),
                ", '",
                Strings.toHexString(uint160(msg.sender)),
                "' , '",
                comments,
                "' , ",
                Strings.toString(views),
                ", ",
                Strings.toString(share),
                ", ",
                Strings.toString(follower),
                ", ",
                Strings.toString(like),
                ", ",
                Strings.toString(dislike),
                ",'",
                time,
                "','",
                date,
                "' )"
            )
        );
    }

    address[] public users;

    string[] post_comments;

    uint256 internal users_count;
    uint256 internal posts_count;

    struct user {
        uint256 post_count;
        address addr;
        uint256 creater;
        uint256 type_;
        address[] subscribers;
        string[] posts;
        uint256 videos;
    }

    struct post {
        string content;
        string title;
        uint256 type_;
        string time;
        string date;
        uint256 like;
        uint256 dislike;
        uint256 views;
        address posted_user;
    }

    post[] public posts;
    user[] public user_data;

    mapping(address => user[]) user_detials;
    mapping(address => post[]) posts_by_user;

    post publicobj;
    user add_usr;

    function add_user(address new_user) public {
        string memory buyer = "";
        // if user not in users var then store the user
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i] != new_user) {
                users.push(new_user);

                user memory add_detials;
                user_data.push(add_detials);
                add_detials.post_count = 0;
                add_detials.addr = msg.sender;
                add_detials.creater = 0;
                add_detials.type_ = 0;
                user_data[user_data.length].subscribers.push(msg.sender);
                user_data[user_data.length].posts.push(" ");
                add_detials.videos = 0;
                insert(
                    1,
                    "testing_point",
                    posts_count,
                    4,
                    5 * 800,
                    6,
                    5,
                    buyer,
                    " "
                );
            }
        }
    }

    function get_total_number_of_users() public view returns (uint256) {
        return users.length;
    }

    function get_current_user_name() public view returns (address) {
        return msg.sender;
    }

    function post_metireals(
        string memory content,
        string memory title,
        string memory time,
        string memory date
    ) public {
        publicobj = post(content, title, 1, time, date, 1, 1, 1, address(this));
        posts_by_user[msg.sender].push(publicobj);
        // if user not in users var then store the user
        add_user(msg.sender);
        posts.push(publicobj);
    }

    function get_all_post() public view returns (post[] memory) {
        return posts;
    }

    function get_by_username(address addr) public view returns (post[] memory) {
        return posts_by_user[addr];
    }

    function add_like(address post_user) public {
        for (uint256 i = 0; i < posts.length; i++) {
            if (posts[i].posted_user == post_user) {
                posts[i].like = posts[i].like + 1;
                break;
            }
        }
    }

    function add_views(address post_user) public {
        for (uint256 i = 0; i < posts.length; i++) {
            if (posts[i].posted_user == post_user) {
                posts[i].views = posts[i].views + 1;
                break;
            }
        }
    }

    function add_dislike(address post_user) public {
        for (uint256 i = 0; i < posts.length; i++) {
            if (posts[i].posted_user == post_user) {
                if (posts[i].dislike <= 0) {
                    posts[i].dislike = 0;
                } else {
                    posts[i].like = posts[i].like - 1;
                    break;
                }
            }
        }
    }

    function add_subscriber(address creater, address sub_user) public {
        for (uint256 i = 0; i < users.length; i++) {
            if (user_data[i].addr == creater) {
                user_data[i].subscribers.push(sub_user);
                break;
            }
        }
    }
    // function get_subscribed_videos()public returns(string){
    //     string[] total_data;
    //     for(uint256 i=0 ; i < users.length;i++){
    //         if(user_data[i].addr == address(this)){
    //             for(uint256 j=0;j<user_data[i].subscribers.length;j++){
    //                 for(uint256 k=0;k<post.length;k++){
    //                     if(user_data[i].subscribers[j] == post[k].posted_user){
    //                         total_data.push(post[k]);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
}

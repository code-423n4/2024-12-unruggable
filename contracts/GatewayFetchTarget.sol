//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {GatewayRequest} from "./GatewayRequest.sol";
import {IGatewayVerifier} from "./IGatewayVerifier.sol";
import {IGatewayProtocol} from "./IGatewayProtocol.sol";

error OffchainLookup(address from, string[] urls, bytes request, bytes4 callback, bytes carry);

abstract contract GatewayFetchTarget {
    struct Session {
        IGatewayVerifier verifier;
        bytes context;
        GatewayRequest req;
        bytes4 callback;
        bytes carry;
    }

    function fetch(IGatewayVerifier verifier, GatewayRequest memory req, bytes4 callback) internal view {
        fetch(verifier, req, callback, "", new string[](0));
    }

    function fetch(
        IGatewayVerifier verifier,
        GatewayRequest memory req,
        bytes4 callback,
        bytes memory carry,
        string[] memory urls
    ) internal view {
        bytes memory context = verifier.getLatestContext();
        if (urls.length == 0) urls = verifier.gatewayURLs();
        revert OffchainLookup(
            address(this),
            urls,
            abi.encodeCall(IGatewayProtocol.proveRequest, (context, req)),
            this.fetchCallback.selector,
            abi.encode(Session(verifier, context, req, callback, carry))
        );
    }

    function fetchCallback(bytes calldata response, bytes calldata carry) external view {
        Session memory ses = abi.decode(carry, (Session));
        (bytes[] memory values, uint8 exitCode) = ses.verifier.getStorageValues(ses.context, ses.req, response);
        (bool ok, bytes memory ret) = address(this).staticcall(
            abi.encodeWithSelector(ses.callback, values, exitCode, ses.carry)
        );
        if (ok) {
            assembly {
                return(add(ret, 32), mload(ret))
            }
        } else {
            assembly {
                revert(add(ret, 32), mload(ret))
            }
        }
    }
}

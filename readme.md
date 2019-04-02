# 이더리움 처음 시작하기 web3.js(windows)

## 설치

### geth 설치
- go-ethereum : https://gethstore.blob.core.windows.net/builds/geth-windows-amd64-1.8.23-c9427004.exe

### web3.js 설치
``` npm install web3.js```
- Vcbuild와 관련하여 에러발생 후 설치 실패시
  - [visual studio 2017](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&rel=15) 설치
- websocket 관련 오류가 발생할 수 있다, 설치된 websocket 폴더를 node_modules에서 삭제한다.

## 준비

### node 실행
개발 할 장비에 node를 생성하여 etherium 네트워크에 접근 할 수 있는 환경을 만든다.

1. 노드 생성하기

## 개인 체인 생성하기

- 계정 생성하기
```
geth account new --datadir .
```
- genesis block 생성 하기
```
geth --datadir . init genesis.json
```
- genesis file
```json {
  "config": {
    "chainId": 830426,
    "homesteadBlock": 0,
    "eip155Block": 0
  },
  "difficulty": "20",
  "gasLimit": "2100000",
  "alloc": {
    "7df9a875a174b3bc565e6424a0050ebc1b2d1d82":
    { "balance": "300000" },
    "5dd4fe803e64f7df6f5f4fae68441c41537a562f" : {"balance" : "19000000"},
    "389Df69303dE18D61D8560F7A4890685b3eA5F06" : {"balance" : "20000000"}
  }
}
```
- node 띄우기
```
geth --datadir . --networkid 830426 --rpc --rpcport 8545 --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --nodiscover console
```
- mining 하기
```
 >miner.start()
 ```
- mining stop 하기
```
>miner.stop()
```

### 개인용 blochain account 정보 (based on Core etherum programming book)
- account : 0x389Df69303dE18D61D8560F7A4890685b3eA5F06
- privateKey: '0xa3da3af1b78d994cead635f2213e02835a32f9ab9aa07f57ab9cb987d1cebe82'
- account : '0xeb3C5cEcFA120684f7af22df4c34d6f2590236D5'
- privateKey: '0xed2ed80aa5d30675905ff3fd5edfce0e64a939bdbc6388e704b09b2f036e83c2'

### accout 생성 및 초기 etheriume 할당하기
```
$ geth --datadir . --networkid 830426 console
> personal.NewAccount()
```

## 하나의 device에서 여러개 개인 노드 생성하기 (based on Core etherum programming book)

### 시나리오

1. 3개의 노드를 위한 3개의 데이터 폴더(datadir)를 생성한다.
1. 3개의 노드의 사용한 account를 생성한다. genesis 블럭을 생성전에 생성하는 이유는, 계정에 ether를 제공하기 위함이다.
1. genesis.json 파일을 생성하고, 생성된 account에 할당할 Wei를 작성한다.
1. 각 노드별로 genesis block을 생성한다.
1. 각 노드를 실행한다.
1. node 1번을 boot node로 이용할 수 있게 enode 값을 각 node에 피어로 등록한다.
1. node 2번에서 자신의 account를 unlock 한다.
1. node 2번에서 자신의 account를 이용하여 node 3 번에 1 ether를 송금한다.
1. node1, node2 ,node3 에서 pendingTransaction을 조회한다.
1. 각각의 노드에서 마이닝을 진행한 후에 pedingTransaction을 조회한 결과를 확인하다.
1. 각각의 노드의 계정의 balance를 확인한다.

### 노드 정보

하나의 device에서 여러개 개인 노드들을 생성할 때 port, rpcPort, ipcdisable, datadir에 대한 option 값 지정이 필요하다.
ipcdisable을 지정하는 이유는 ipc 사용을 위한 파일을 생성 및 접근하려 하므로, 나중에 실행되는 노드가 실행될 수 없기 때문임

- node1 : --port 30303 --rpcprot 8545 --datadir node1 --ipcdisable
- node2 : --port 30304 --rpcport 8546 --datadir node2 --ipcdisable
- node3 : --port 30305 --rpcport 8547 --datadir node3 --ipcdisable

### 노드 실행

- 각 노드별로 사용자 계정을 생성한다.
Passphrase 값을 잘 기억해 둔다. 나중에 트랜잭션을 보낼때 사용된다.

```shell
$geth --datadir node1 account new
$geth --datadir node2 account new
$geth --datadir node3 account new
```

- 각 노드별 데이타 디렉토리의 account key genesis.json파일에 초기 balance을 배정한다.

```json {
  "config": {
    "chainId": 830426,
    "homesteadBlock": 0,
    "eip155Block": 0
  },
  "difficulty": "20",
  "gasLimit": "2100000",
  "alloc": {
    "7df9a875a174b3bc565e6424a0050ebc1b2d1d82": { "balance": "300000000" },
    "5dd4fe803e64f7df6f5f4fae68441c41537a562f" : {"balance" : "190000000"},
    "389Df69303dE18D61D8560F7A4890685b3eA5F06" : {"balance" : "200000000"}
  }
}
```

- 각 노드별로 동일한 genesis.json 파일을 이용하여 block의 초기화를 한다.

```shell
$geth --datadir node1 init genesis.json
$geth --datadir node2 init genesis.json
$geth --datadir node3 init genesis.json
```

- 각 노드별로 동일한 networkid(13)를 이용하여 노드(geth)를 실행한다.

```shell
$geth --datadir node1 --networkid 13 --rpc --rpcport 8545 --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --port 30303 --ipcdisable console
$geth --datadir node2 --networkid 13 --rpc --rpcport 8546 --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --port 30304 --ipcdisable console
$geth --datadir node3 --networkid 13 --rpc --rpcport 8547 --rpccorsdomain "*" --rpcapi "db,eth,net,web3,personal" --port 30305 --ipcdisable console
```

- 1번 노드의 enode 알아내기.

```shell
> admin.nodeInfo.enode
"enode://8d12ab346c32590d966163b86f6a113ac862583061578e8f61cd75ebdd17d1815ed8396f60711a7de15d5bfb85af0860a3ae2414f16166e396b9b06626655b0d@1.223.223.3:30304"
```

- 1번노드를 boot노드로 사용하기 위해 peer 등록을 한다. 단일 device내에서 사용할 경우 IP를 local로 setting한다

```shell
>admin.addPeer("enode://8d12ab346c32590d966163b86f6a113ac862583061578e8f61cd75ebdd17d1815ed8396f60711a7de15d5bfb85af0860a3ae2414f16166e396b9b06626655b0d@127.0.0.1:30304")
```

- geth로 노드가 실행 될때 자동으로 peer등록하는 방법
  <datadir>/geth/static-nodes.json 이 파일에 아래와 같이 등록하면 된다.

```json
[
   "enode://8d12ab346c32590d966163b86f6a113ac862583061578e8f61cd75ebdd17d1815ed8396f60711a7de15d5bfb85af0860a3ae2414f16166e396b9b06626655b0d@127.0.0.1:30304"
]
```

- node2에서 node3 로 송금하기 위한 account unlock
```shell
>personal.unlockAccount(eht.coinbase)
```

- node2에서 node3로 송금
```shell
>eth.sendTransaction({from: eth.coinbase, to: "node3의 account addredd", value: "10000000"})
```

- node3에서 node2 로 송금하기
```shell
>eth.sendTransaction({from: eth.coinbase, to: "node2의 account addredd", value: "10000000"})
```

- node2, 3에서 pendingTransaction확인하기
```shell
>eth.pendingTransaction

[{
    blockHash: null,
    blockNumber: null,
    from: "0xfa864517e1f5ae278fadededd49b7cd3622b6261",
    gas: 90000,
    gasPrice: 1000000000,
    hash: "0xd54fd2a0c8658cbb2f3fc1cef5d1d03f21d12afc8b01db8a37e7fc82f40f080c",
    input: "0x",
    nonce: 25,
    r: "0x9106a87fdeab37d100d9de276f38d75faa41de3926be486bff3b5a679b16217e",
    s: "0xd7ba3104c7bb6c8cc91e7fc9b6c384402af15a5197a58e4f6394a8a936878f2",
    to: "0x5dd4fe803e64f7df6f5f4fae68441c41537a562f",
    transactionIndex: 0,
    v: "0x1957d7",
    value: 1000000000000000000
}]
```
- node1에서 mining 시작하기

```shell
>miner.start(1)
```
- node2, node3의 pendingTransaction확인하기
- node2에서 mining 시작
- node2, node3의 pendingTransaction확인하기

### 결과
각 노드에서 생성된 transaction은 해당 노드에서 mining을 하지 않으면 transaction이 block에 기록되지 않는 것을 확인 하였다.
이유는 잘 모르겠지만, [wiki](https://github.com/ethereum/go-ethereum/wiki/Private-network)를 따라서 private 노드를 생성해 봐야 겠다.

// (C) Copyright 2016-2017 Parity Technologies (UK) Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//				 http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from 'react';
import { ReactiveComponent, Rspan, Hash } from 'oo7-react';
import { Card, List, Icon } from 'semantic-ui-react';
import { formatBlockNumber } from 'oo7-parity';
import { InlineAccount, InlineBalance } from './';

// supports:
// gas: true,
// gasPrice: true,
// txHash: true,
// from: true,
// to: true,
// ether: true,
// blockHash: true,
// blockNumber: true,
// input: true,
// transactionIndex: true,

// condition: true,
// creates: true,
// networkId: true,
// nonce: true,
// publicKey: true,
// raw: true,
// signature: true,

// FIXME: Clarify intent
const formatCondition = c => c
	? (typeof c === timestamp // eslint-disable-line no-undef, valid-typeof
		? new Date(c)
		: formatBlockNumber(c)
	)
	: '';

export class Transaction extends ReactiveComponent {
	constructor () {
		super(['transaction']);
	}

	render () {
		if (this.state.transaction === null || this.state.transaction === undefined) {
			return (
				<Card fluid>
					<Card.Content>
						<Card.Description>
							<Icon name='warning circle' style={{height: '100%'}} />
							transaction undefined
						</Card.Description>
					</Card.Content>
				</Card>
			);
		} else {
			return (
				<Card fluid>
					<Card.Content>
						<Card.Description>
							<List divided verticalAlign='middle'>
								{this.props.txHash ?	<List.Item>
									<List.Content>
										TXN Hash
									</List.Content>
									<List.Content floated='right'>
										<Hash value={this.state.transaction.hash} />
									</List.Content>
								</List.Item> : '' }
								{this.props.blockHash ? <List.Item>
									<List.Content>
										Block Hash
									</List.Content>
									<List.Content floated='right'>
										<Hash value={this.state.transaction.blockHash} />
									</List.Content>
								</List.Item> : '' }
								{this.props.blockNumber ? <List.Item>
									<List.Content>
										Block Number
									</List.Content>
									<List.Content floated='right'>
										<Rspan>{formatBlockNumber(this.state.transaction.blockNumber)}</Rspan>
									</List.Content>
								</List.Item> : '' }
								{this.props.from ?	<List.Item>
									<List.Content>
										From
									</List.Content>
									<List.Content floated='right'>
										<InlineAccount address={this.state.transaction.from} />
									</List.Content>
								</List.Item> : '' }
								{this.props.to ?	<List.Item>
									<List.Content>
										To
									</List.Content>
									<List.Content floated='right'>
										<InlineAccount address={this.state.transaction.to} />
									</List.Content>
								</List.Item> : '' }
								{this.props.ether ?	<List.Item>
									<List.Content>
										Amount
									</List.Content>
									<List.Content floated='right'>
										<InlineBalance value={this.state.transaction.value} />
									</List.Content>
								</List.Item> : '' }
								{this.props.condition ? <List.Item>
									<List.Content>
										Condition
									</List.Content>
									<List.Content floated='right'>
										<Rspan>{formatCondition(this.state.transaction.condition)}</Rspan>
									</List.Content>
								</List.Item> : '' }
								{this.props.creates ? <List.Item>
									<List.Content>
										Creates
									</List.Content>
									<List.Content floated='right'>
										<InlineAccount address={this.state.transaction.creates} />
									</List.Content>
								</List.Item> : '' }
								{this.props.gas ? <List.Item>
									<List.Content>
										Gas
									</List.Content>
									<List.Content floated='right'>
										<Rspan>{this.state.transaction.gas.toString(10)}</Rspan>
									</List.Content>
								</List.Item> : '' }
								{this.props.gasPrice ? <List.Item>
									<List.Content>
										Gas Price
									</List.Content>
									<List.Content floated='right'>
										<InlineBalance value={this.state.transaction.gasPrice} />
									</List.Content>
								</List.Item> : '' }
								{this.props.input ? <List.Item>
									<List.Content>
										Input Data
									</List.Content>
									<List.Content floated='right'>
										{/* Input is raw byte data */}
										<Hash value={this.state.transaction.input.toString(16)} />
									</List.Content>
								</List.Item> : '' }
								{this.props.networkId ? <List.Item>
									<List.Content>
										Network Id
									</List.Content>
									<List.Content floated='right'>
										<Rspan>{this.state.transaction.networkId}</Rspan>
									</List.Content>
								</List.Item> : '' }
								{this.props.nonce ? <List.Item>
									<List.Content>
										Nonce
									</List.Content>
									<List.Content floated='right'>
										<Rspan>{this.state.transaction.nonce.toString(10)}</Rspan>
									</List.Content>
								</List.Item> : '' }
								{this.props.publicKey ? <List.Item>
									<List.Content>
										Public Key
									</List.Content>
									<List.Content floated='right'>
										<Hash value={this.state.transaction.publicKey} />
									</List.Content>
								</List.Item> : '' }
								{this.props.signature
									? (
										<List.Item>
											<List.Content floated='right'>
												<Hash value={this.state.transaction.r} />
											</List.Content>
											<List.Content>
												R
											</List.Content>

											<List.Content floated='right'>
												<Hash value={this.state.transaction.s} />
											</List.Content>
											<List.Content>
												S
											</List.Content>

											<List.Content floated='right'>
												<Rspan>{this.state.transaction.v}</Rspan>
											</List.Content>
											<List.Content>
												V
											</List.Content>

											<List.Content floated='right'>
												<Rspan>{this.state.transaction.standardV}</Rspan>
											</List.Content>
											<List.Content>
												Standard V
											</List.Content>
										</List.Item>
									)
									: '' }
								{this.props.raw ? <List.Item>
									<List.Content>
										Raw
									</List.Content>
									<List.Content floated='right'>
										{/* RAW BYTE DATA */}
										<Hash value={this.state.transaction.raw.toString(16)} />
									</List.Content>
								</List.Item> : '' }
								{this.props.transactionIndex ? <List.Item>
									<List.Content>
										TXN Index
									</List.Content>
									<List.Content floated='right'>
										<Rspan>{this.state.transaction.transactionIndex.toString(10)}</Rspan>
									</List.Content>
								</List.Item> : '' }
							</List>
						</Card.Description>
					</Card.Content>
				</Card>
			);
		}
	}
}

Transaction.defaultProps = {
	txHash: true,
	from: true,
	to: true,
	ether: true
};

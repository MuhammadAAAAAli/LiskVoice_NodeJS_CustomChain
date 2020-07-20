/*
 * Copyright © 2020 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 */
const {
    BaseTransaction,
    TransactionError
} = require('@liskhq/lisk-transactions');

class IpfsTransaction extends BaseTransaction {

	static get TYPE () {
		return 20;
	};

	static get FEE () {
		return `${10 ** 8}`;
	};

	async prepare(store) {
		await store.account.cache([
			{
				address: this.senderId,
			},
		]);
	}

	validateAsset() {
		const errors = [];
		if (!this.asset.ipfs || typeof this.asset.ipfs !== 'string' || this.asset.ipfs.length > 64) {
			errors.push(
				new TransactionError(
					'Invalid "asset.ipfs" defined on transaction',
					this.id,
					'.asset.ipfs',
					this.asset.ipfs,
					'A string value no longer than 64 characters',
				)
			);
		}
		return errors;
	}

	applyAsset(store) {
        const errors = [];
        const sender = store.account.get(this.senderId);
        if (sender.asset && sender.asset.ipfs) {

        } else {
            const newObj = { ...sender, asset: { ipfs: this.asset.ipfs } };
            store.account.set(sender.address, newObj);
        }
        return errors; // array of TransactionErrors, returns empty array if no errors are thrown
	}

	undoAsset(store) {
		const sender = store.account.get(this.senderId);
		const oldObj = { ...sender, asset: null };
		store.account.set(sender.address, oldObj);
		return [];
	}
}

module.exports = IpfsTransaction;


import React from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';

const WalletButton = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const handleWalletClick = async () => {
        if (!publicKey) {
            console.error('Wallet not connected!');
            return;
        }

        try {
            // Example transaction: Transfer 0.001 SOL to another address
            const fromWallet = Keypair.generate();
            const toWallet = Keypair.generate();
            const lamports = 1000000; // 0.001 SOL
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: fromWallet.publicKey,
                    toPubkey: toWallet.publicKey,
                    lamports
                })
            );
            const signature = await sendTransaction(transaction, [fromWallet, toWallet]);

            console.log('Transaction successful!');
            console.log('Transaction signature:', signature);
        } catch (error) {
            console.error('Transaction failed!');
            console.error('Transaction error:', error);
        }
    };

    return (
        <button onClick={handleWalletClick}>Connect Wallet</button>
    );
};

export default WalletButton;

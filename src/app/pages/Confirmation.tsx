import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Check, Clock, MapPin, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import { QueueIndicator } from '../components/QueueIndicator';
import { useOrders } from '../context/OrderContext';
import { useState } from 'react';

export function Confirmation() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { getOrderById, markPickedUp } = useOrders();
	const [pickupCodeInput, setPickupCodeInput] = useState('');
	const [pickupError, setPickupError] = useState('');

	const order = id ? getOrderById(id) : undefined;

	if (!order) {
		return (
			<div className="flex flex-col items-center justify-center h-full p-4">
				<p className="text-gray-500 mb-4">Pesanan tidak ditemukan</p>
				<button
					onClick={() => navigate('/')}
					className="text-[var(--primary)] font-medium">
					Kembali ke Beranda
				</button>
			</div>
		);
	}

	const storeNames = Array.from(
		new Set(order.items.map((item) => item.store)),
	);
	const primaryStoreName =
		storeNames.length === 1 ? storeNames[0] : 'Beberapa Toko';
	const isPendingPickup = order.status === 'pending-pickup';

	const handlePickupCompleted = () => {
		const success = markPickedUp(order.id, pickupCodeInput);
		if (!success) {
			setPickupError('Kode pickup tidak sesuai. Periksa kembali kode Anda.');
			return;
		}
		setPickupError('');
		navigate('/orders');
	};

	return (
		<div className="flex flex-col h-full w-full">
			{/* Header */}
			<header className="bg-[var(--primary)] text-white px-4 py-3 flex items-center gap-3 shrink-0">
				<button
					onClick={() => navigate(-1)}
					className="p-1">
					<ChevronLeft className="w-6 h-6" />
				</button>
				<h1 className="text-lg font-semibold">Konfirmasi Pesanan</h1>
			</header>

			{/* Scrollable content */}
			<div className="flex-1 overflow-y-auto px-4 pt-6 pb-18 space-y-6">
				{/* Success icon */}
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: 'spring', stiffness: 200, damping: 15 }}
					className="flex flex-col items-center">
					<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-3">
						<Check className="w-10 h-10 text-green-600" />
					</div>
					<h2 className="text-2xl font-bold text-gray-900 text-center">
						Pesanan Dikonfirmasi!
					</h2>
				</motion.div>
				{/* Pickup code */}
				<div className="text-center">
					<p className="text-gray-500 text-sm mb-2">Kode Pickup:</p>
					<div className="bg-[var(--secondary)]/10 rounded-xl p-4 inline-block">
						<p className="text-3xl font-bold tracking-widest text-gray-900">
							{order.pickupCode}
						</p>
					</div>
				</div>
				{/* Timer */}
				<div className="text-center">
					<div className="flex items-center justify-center gap-1.5">
						<Clock className="w-5 h-5 text-[var(--destructive)]" />
						<span className="text-sm text-gray-600">
							Selesaikan dalam
						</span>
					</div>
					<p className="text-2xl font-bold text-[var(--destructive)] mt-1">
						30:00
					</p>
				</div>
				<QueueIndicator
					initialQueue={4}
					storeName={primaryStoreName}
				/>
				{/* Order detail card */}
				<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
					<h3 className="font-semibold text-gray-900 mb-3">
						Detail Pesanan
					</h3>
					<div className="space-y-3">
						{order.items.map((item) => (
							<div
								key={item.id + '-' + item.name}
								className="flex items-start gap-3">
								<img
									src={item.image}
									alt={item.name}
									className="w-16 h-16 rounded-xl object-cover"
								/>
								<div className="flex-1">
									<p className="font-semibold text-gray-900">
										{item.name}
									</p>
									<p className="text-gray-500 text-sm">
										{item.store}
									</p>
									<p className="text-[var(--secondary)] font-bold mt-1">
										{item.quantity}x Rp{' '}
										{item.price.toLocaleString('id-ID')}
									</p>
								</div>
							</div>
						))}
						<div className="pt-2 border-t border-gray-100 flex items-center justify-between">
							<span className="text-sm text-gray-500">Total</span>
							<span className="font-bold text-[var(--secondary)]">
								Rp {order.total.toLocaleString('id-ID')}
							</span>
						</div>
					</div>
				</div>
				{/* Pickup location card */}
				<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
					<h3 className="font-semibold text-gray-900 mb-3">
						Lokasi Pengambilan
					</h3>
					<div className="flex items-start gap-3">
						<div className="w-10 h-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center shrink-0">
							<MapPin className="w-5 h-5 text-[var(--primary)]" />
						</div>
						<div>
							<p className="font-medium text-gray-900">
								{primaryStoreName}
							</p>
							<p className="text-gray-500 text-sm">
								Jl. Prof. Soedarto, Tembalang
							</p>
							<p className="text-gray-500 text-sm">
								No. XX, Semarang
							</p>
						</div>
					</div>
				</div>
				{/* Action buttons */}
				<div className="space-y-3">
					<button className="w-full bg-[var(--secondary)] text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-[var(--secondary)]/90 active:scale-[0.98] transition-all">
						<Navigation className="w-5 h-5" />
						Lihat Petunjuk Jalan
					</button>
					{isPendingPickup && (
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700 block">
								Masukkan Kode Pickup untuk verifikasi
							</label>
							<input
								type="text"
								value={pickupCodeInput}
								onChange={(e) => {
									setPickupCodeInput(e.target.value);
									if (pickupError) setPickupError('');
								}}
								placeholder="LAST-1234"
								className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-gray-50 uppercase"
								autoCapitalize="characters"
							/>
							{pickupError && (
								<p className="text-sm text-[var(--destructive)]">{pickupError}</p>
							)}
						</div>
					)}
					<button
						onClick={isPendingPickup ? handlePickupCompleted : () => navigate('/orders')}
						disabled={isPendingPickup && pickupCodeInput.trim().length === 0}
						className="w-full border-2 border-[var(--primary)] text-[var(--primary)] font-semibold py-3.5 rounded-2xl hover:bg-[var(--primary)]/5 active:scale-[0.98] transition-all">
						{isPendingPickup ? 'Saya Sudah Mengambil Pesanan' : 'Kembali ke Pesanan'}
					</button>
				</div>
			</div>
		</div>
	);
}

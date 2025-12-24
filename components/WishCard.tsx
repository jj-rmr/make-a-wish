// /components/WishCard.tsx
export default function WishCard({
  from,
  wish,
}: {
  from: string;
  wish: string;
}) {
  return (
    <div className="absolute p-4 bg-white rounded-xl shadow-lg w-60 text-center">
      <p className="text-sm italic">{wish}</p>
      <p className="text-xs mt-2 font-bold">- {from}</p>
    </div>
  );
}

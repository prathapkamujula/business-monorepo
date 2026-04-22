import { useState } from 'react';
import { useGetAllOffersQuery, useUpdateOfferMutation } from '@/store/api/adminApi';
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Edit2, ArrowLeft, Calendar, Tag } from "lucide-react";

interface Offer {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  color: string;
  updatedAt: string;
  details?: {
    content: any;
    updatedAt: string;
  } | null;
}

export default function Offers() {
  const { data: offers = [], isLoading, error, refetch } = useGetAllOffersQuery(undefined);
  const [updateOffer, { isLoading: isUpdating }] = useUpdateOfferMutation();

  const [editingItem, setEditingItem] = useState<Offer | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleEdit = (offer: Offer) => {
    setEditingItem(offer);
    setEditValue(JSON.stringify(offer.details?.content || {}, null, 2));
    setEditTitle(offer.title);
    setEditSubtitle(offer.subtitle);
    setValidationError(null);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditValue('');
    setEditTitle('');
    setEditSubtitle('');
    setValidationError(null);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    // Validate JSON
    let parsedContent;
    try {
      parsedContent = JSON.parse(editValue);
      setValidationError(null);
    } catch (e: any) {
      setValidationError(`Invalid JSON: ${e.message}`);
      return;
    }

    try {
      await updateOffer({
        id: editingItem.id,
        title: editTitle,
        subtitle: editSubtitle,
        code: editingItem.code,
        color: editingItem.color,
        details: parsedContent,
      }).unwrap();
      setEditingItem(null);
      refetch();
    } catch (err: any) {
      alert(err.data?.message || 'Failed to update offer');
    }
  };

  if (isLoading) return <div className="p-8">Loading offers...</div>;
  if (error) {
    const errorData = error as any;
    return <div className="p-8 text-destructive">{errorData.data?.message || 'Failed to load offers'}</div>;
  }

  // Full screen edit mode
  if (editingItem) {
    return (
      <div className="flex h-full flex-col space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Edit Offer Details</h1>
              <p className="text-sm text-muted-foreground">
                {editingItem.title} ({editingItem.code})
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel} disabled={isUpdating}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isUpdating}>
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col space-y-4 overflow-hidden">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Offer Title</label>
              <Input 
                value={editTitle} 
                onChange={(e) => setEditTitle(e.target.value)} 
                placeholder="Enter offer title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Offer Subheading</label>
              <Input 
                value={editSubtitle} 
                onChange={(e) => setEditSubtitle(e.target.value)} 
                placeholder="Enter offer subheading"
              />
            </div>
          </div>
          
          <div className="flex flex-1 flex-col space-y-2 overflow-hidden">
            <label className="text-sm font-medium">Offer Details (JSON)</label>
            <textarea
              className="flex-1 rounded-md border bg-muted p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              spellCheck={false}
            />
            {validationError && (
              <p className="text-sm font-medium text-destructive">
                {validationError}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Offers</h1>
        <Button onClick={() => alert('Create offer logic would go here')}>Create Offer</Button>
      </div>

      <div className="rounded-lg border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/30 text-muted-foreground border-b">
            <tr>
              <th className="p-4 font-medium">Offer Title</th>
              <th className="p-4 font-medium">Offer Code</th>
              <th className="p-4 font-medium">Last Edited Date Time</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {offers.map((offer) => {
              const lastUpdated = offer.details?.updatedAt 
                ? new Date(Math.max(new Date(offer.updatedAt).getTime(), new Date(offer.details.updatedAt).getTime()))
                : new Date(offer.updatedAt);

              return (
                <tr key={offer.id} className="hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full border shrink-0" 
                        style={{ backgroundColor: offer.color }} 
                      />
                      <div>
                        <div className="font-medium">{offer.title}</div>
                        <div className="text-xs text-muted-foreground">{offer.subtitle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                      <Tag size={12} className="mr-1" />
                      {offer.code}
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {lastUpdated.toLocaleDateString()} {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 ml-auto"
                      onClick={() => handleEdit(offer)}
                    >
                      <Edit2 size={16} />
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {offers.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No promotional offers found.
          </div>
        )}
      </div>
    </div>
  );
}

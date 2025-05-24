import { Api } from "@/config/axios";

export const cardSaveApi = (formData: FormData) => Api.post("/save", formData);

export const cardEditApi = (formData: FormData) => Api.put("/card", formData);

export const getCardApi = (id: string) => Api.get("/card", { params: { id } });

export const getPremiumApi = (id: number) =>
  Api.get("/premium-card", { params: { id } });

export const setUserApi = async (userId: string, cardId: string) => {
  const res = await Api.put("/card_user", { userId, cardId });
  return res;
};

export const getMyCards = async (userId: string) => {
  const res = await Api.get("/get-my-cards", { params: { user_id: userId } });
  return res.data;
};

export const getCustomerOrders = async (userId: string) => {
  const res = await Api.get("/get_orders", { params: { customer_id: userId } });
  return res.data;
};

export const tempSaveCard = (formData: FormData) => Api.post("/temp", formData);

export const removeWatermark = (cardId: string, orderId: string) =>
  Api.put("/remove-watermark", {
    orderId,
    cardId,
  });

export const removeCard = (cardId: string) =>
  Api.delete("/delete-card", { params: { cardId } });

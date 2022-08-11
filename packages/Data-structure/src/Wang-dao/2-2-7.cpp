#include <stdio.h>
#include "../common/seqlist.cpp"

bool concatList(SeqList L, SeqList R, SeqList &C) {
  if (L.length + R.length> C.MaxSize) {
    return false;
  }
  int i = 0, j = 0, k = 0;
  while (i < L.length && j < R.length) {
    if (L.data[i] <= R.data[j]) {
      C.data[k++] = L.data[i++];
    } else {
      C.data[k++] = R.data[j++];
    }
  }

  while (i < L.length) {
    C.data[k++] = L.data[i++];
  }

  while (j < R.length) {
    C.data[k++] = R.data[j++];
  };
  C.length = k;

  return true;
}

int data1[] = {1, 2, 4, 6, 7};
int data2[] = {1, 2, 3, 5, 7, 8};

void createTestData(SeqList &L, int data[], int len) {
  for (int i = 0; i < len; i++) {
     AddElem(L, data[i]);
  }
  L.length = len;
}

int main() {
  SeqList L;
  SeqList R;
  SeqList C;
  InitSeqList(L);
  InitSeqList(R);
  InitSeqList(C);
  createTestData(L, data1, sizeof(data1) / sizeof(int));
  createTestData(R, data2, sizeof(data2) / sizeof(int));
  concatList(L, R, C);
  for (int i = 0; i < C.length; i++)
  {
    printf("%d\n", C.data[i]);
  }
}
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

// ============================================
//  DATA PROFIL
// ============================================
const PROFILE = {
  name: 'Rizki Aidil Fazri',
  title: 'Full-Stack Mobile Developer',
  email: 'rizkiaidilfazri@gmail.com',
  phone: '0831-5673-3615',
  location: 'Cirebon, West Java',
  bio: 'I am a passionate mobile developer with experience in building cross-platform applications using React Native. I enjoy creating user-friendly and efficient mobile experiences.',
  avatar: 'https://lh3.googleusercontent.com/ogw/AF2bZygIfFKwtAioJea_Q_tMydiMhK-essen4BE8WUhlu7tUCQ=s64-c-mo',
  avatarOffline: 'assets/favicon.png',
};

// ============================================
//  DATA SKILLS
// ============================================
const SKILLS = [
  { id: '1', name: 'React Native', level: 90, color: '#61DAFB' },
  { id: '2', name: 'Flutter',      level: 75, color: '#02569B' },
  { id: '3', name: 'JavaScript',   level: 88, color: '#F7DF1E' },
  { id: '4', name: 'TypeScript',   level: 80, color: '#3178C6' },
  { id: '5', name: 'Node.js',      level: 70, color: '#339933' },
  { id: '6', name: 'Firebase',     level: 82, color: '#FFCA28' },
];

// ============================================
//  DATA SECTIONS (Riwayat)
// ============================================
const SECTIONS = [
  {
    title: '💼 Pengalaman Kerja',
    data: [
      {
        id: 'e1',
        role: 'Senior Mobile Developer',
        company: 'PT. TechVision Indonesia',
        period: '2029 – Sekarang',
        desc: 'Memimpin tim 5 developer dalam pengembangan aplikasi e-commerce mobile.',
      },
      {
        id: 'e2',
        role: 'Mobile Developer',
        company: 'Startup Fintech – PayEasy',
        period: '2020 – 2022',
        desc: 'Mengembangkan fitur pembayaran digital menggunakan React Native & Redux.',
      },
    ],
  },
  {
    title: '🎓 Pendidikan',
    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company: 'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024 – 2029',
        desc: 'IPK 3.72 / 4.00 · Skripsi: Implementasi ML pada Aplikasi Mobile.',
      },
    ],
  },
];

// ============================================
//  DATA SOCIAL MEDIA
// ============================================
const SOCIAL = [
  { id: 's1', label: 'GitHub',   icon: '🐙', url: 'https://github.com/Rizki-Code156' },
  { id: 's2', label: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/rizki-aidil-fazri-059957439/' },
  { id: 's3', label: 'YouTube',  icon: '📺', url: 'https://www.youtube.com/@rizkiaidilfazri' },
];

// ============================================
//  SUB-COMPONENTS
// ============================================

const SkillCard = ({ item }) => (
  <View style={styles.skillCard}>
    <View style={styles.skillHeader}>
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillPercent}>{item.level}%</Text>
    </View>
    <View style={styles.progressBg}>
      <View
        style={[
          styles.progressFill,
          { width: `${item.level}%`, backgroundColor: item.color },
        ]}
      />
    </View>
  </View>
);

const TimelineCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.timelineCard} onPress={() => onPress(item)}>
    <View style={styles.timelineDot} />
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
    </View>
  </TouchableOpacity>
);

// ============================================
//  MAIN APP
// ============================================

export default function App() {

  // — STATE ————————————————————————————————
  // 11. Switch: apakah user "Open to Work"?
  const [openToWork, setOpenToWork] = useState(true);

  // 12. Modal: item yang dipilih & visibilitas modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible]  = useState(false);

  // 7. TextInput: nilai input form kontak
  const [senderName, setSenderName] = useState('');
  const [message, setMessage]       = useState('');

  // 13. ActivityIndicator: status loading
  const [sending, setSending] = useState(false);

  // 10. Pressable: status sedang ditekan
  const [pressing, setPressing] = useState(false);

  // — HANDLER FUNCTIONS ————————————————————
  const handleCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleSend = () => {
    if (!senderName.trim() || !message.trim()) {
      Alert.alert('⚠️ Peringatan', 'Nama dan pesan tidak boleh kosong!');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSenderName('');
      setMessage('');
      Alert.alert('✅ Berhasil', `Pesan dari ${senderName} telah terkirim!`);
    }, 2000);
  };

  return (
    // 15. SafeAreaView → area aman dari notch/home bar
    <SafeAreaView style={styles.safeArea}>

      {/* 14. StatusBar → mengatur warna status bar */}
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* ── HEADER BAR ── */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>My CV</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {openToWork ? '🟢 Open to Work' : '🔴 Not Available'}
          </Text>
          {/* 11. Switch → toggle "Open to Work" */}
          <Switch
            value={openToWork}
            onValueChange={setOpenToWork}
            thumbColor={openToWork ? '#4ade80' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#16a34a' }}
          />
        </View>
      </View>

      {/* 4. ScrollView → semua konten CV dibungkus di sini */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ════════════════════════════════════
            SECTION PROFIL
            Komponen: View, Text, Image
            ════════════════════════════════════ */}
        <View style={styles.profileSection}>

          {/* 3. Image → foto profil dari URL internet */}
          <Image
            source={{ uri: PROFILE.avatar }}
            style={styles.avatar}
            // resizeMode menentukan cara gambar menyesuaikan ukuran
            // 'cover' = memenuhi area (mungkin terpotong)
            // 'contain' = semua terlihat (mungkin ada ruang kosong)
          />

          {/* Conditional rendering: badge hanya tampil jika openToWork = true */}
          {openToWork && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>✅ Open to Work</Text>
            </View>
          )}

          {/* 2. Text → berbagai ukuran & weight */}
          <Text style={styles.profileName}>{PROFILE.name}</Text>
          <Text style={styles.profileTitle}>{PROFILE.title}</Text>
          <Text style={styles.profileBio}>{PROFILE.bio}</Text>

          {/* Info kontak dalam baris horizontal */}
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>📧 {PROFILE.email}</Text>
            <Text style={styles.contactItem}>📍 {PROFILE.location}</Text>
          </View>
          <Text style={styles.contactItem}>📱 {PROFILE.phone}</Text>

          {/* 9. TouchableOpacity → tombol sosial media */}
          <View style={styles.socialRow}>
            {SOCIAL.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={styles.socialBtn}
                onPress={() => Alert.alert('🔗 Link', s.url)}
                activeOpacity={0.8}
              >
                <Text style={styles.socialIcon}>{s.icon}</Text>
                <Text style={styles.socialLabel}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 10. Pressable → tombol dengan efek saat ditekan */}
          <Pressable
            // style bisa berupa fungsi yang menerima { pressed }
            style={({ pressed }) => [
              styles.downloadBtn,
              pressed && styles.downloadBtnPressed, // style tambahan saat ditekan
            ]}
            onPressIn={() => setPressing(true)}
            onPressOut={() => setPressing(false)}
            onPress={() => Alert.alert('📥 Download', 'CV sedang diunduh...')}
          >
            <Text style={styles.downloadBtnText}>
              {pressing ? '⏳ Mengunduh...' : '📥  Download CV (PDF)'}
            </Text>
          </Pressable>
        </View>

        {/* Konten lanjutan di langkah berikutnya */}
        <View style={{ height: 40 }} />

        {/* ════════════════════════════════════
            SECTION SKILLS
            Komponen: FlatList
            ════════════════════════════════════ */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>🔧 Keahlian</Text>
          <Text style={styles.sectionSubtitle}>
            ↳ FlatList: menampilkan list data secara efisien
          </Text>

          {/* 5. FlatList → daftar skill */}
          <FlatList
            data={SKILLS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SkillCard item={item} />}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View style={{ height: 8 }} />
            )}
          />
        </View>

        {/* ════════════════════════════════════
            SECTION RIWAYAT
            Komponen: SectionList
            ════════════════════════════════════ */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>📋 Riwayat</Text>
          <Text style={styles.sectionSubtitle}>
            ↳ SectionList: data dikelompokkan per kategori. Ketuk kartu untuk Modal detail.
          </Text>

          {/* 6. SectionList → pengalaman & pendidikan */}
          <SectionList
            sections={SECTIONS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              // TimelineCard punya onPress untuk membuka Modal
              <TimelineCard item={item} onPress={handleCardPress} />
            )}
            // renderSectionHeader: header untuk tiap kelompok
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
              </View>
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </View>

        {/* ════════════════════════════════════
            SECTION FORM KONTAK
            Komponen: TextInput, Button, ActivityIndicator
            ════════════════════════════════════ */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>📩 Hubungi Saya</Text>
          <Text style={styles.sectionSubtitle}>
            ↳ TextInput, Button, ActivityIndicator
          </Text>

          {/* 7. TextInput → input nama (single line) */}
          <TextInput
            style={styles.textInput}
            placeholder="Nama Anda"
            placeholderTextColor="#888"
            value={senderName}
            onChangeText={setSenderName}
            returnKeyType="next"
            editable={!sending}
          />

          {/* 7. TextInput → input pesan (multiline = seperti textarea) */}
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Tulis pesan Anda di sini..."
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            editable={!sending}
          />

          {/* Kondisi: tampilkan loading atau tombol kirim */}
          {sending ? (
            // 13. ActivityIndicator → spinner saat proses
            <View style={styles.loadingRow}>
              <ActivityIndicator size="large" color="#7c3aed" />
              <Text style={styles.loadingText}>Mengirim pesan...</Text>
            </View>
          ) : (
            // 8. Button → tombol standar React Native
            <Button
              title="📨  Kirim Pesan"
              color="#7c3aed"
              onPress={handleSend}
            />
          )}
        </View>

        <View style={{ height: 40 }} />

      </ScrollView>

      {/* ════════════════════════════════════
          12. MODAL → popup detail riwayat
          ════════════════════════════════════ */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Overlay gelap di belakang dialog */}
        <View style={styles.modalOverlay}>

          {/* Kotak dialog */}
          <View style={styles.modalBox}>
            {/* Render isi hanya jika ada item yang dipilih */}
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.company}</Text>
                <Text style={styles.modalPeriod}>📅  {selectedItem.period}</Text>
                <View style={styles.modalDivider} />
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
              </>
            )}

            {/* Tombol tutup modal */}
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseBtnText}>✕  Tutup</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>

    </SafeAreaView>
  );
}

// ============================================
//  PALET WARNA
// ============================================
const COLORS = {
  bg:           '#0f0f1a',  // latar belakang
  card:         '#1a1a2e',  // kartu/panel
  cardBorder:   '#2d2d44',  // border kartu
  accent:       '#7c3aed',  // ungu utama
  accentLight:  '#a78bfa',  // ungu muda
  accentGold:   '#f59e0b',  // emas
  text:         '#f0f0f0',  // teks utama
  textMuted:    '#9ca3af',  // teks redup
  textDim:      '#6b7280',  // teks sangat redup
  success:      '#4ade80',  // hijau
  white:        '#ffffff',
};

// ============================================
//  16. StyleSheet.create() → semua style
// ============================================
const styles = StyleSheet.create({

  // ── LAYOUT DASAR ──────────────────────────
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },

  // ── HEADER BAR ────────────────────────────
  headerBar: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },

  // ── SECTION PROFIL ─────────────────────────
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    marginBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomWidth: 2,
    borderColor: COLORS.accent,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: COLORS.accent,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
  },
  profileName: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  profileTitle: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 14,
    textAlign: 'center',
  },
  profileBio: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 6,
  },
  contactItem: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },

  // ── SOSIAL MEDIA ───────────────────────────
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 20,
  },
  socialBtn: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  socialIcon: { fontSize: 20, marginBottom: 4 },
  socialLabel: {
    color: COLORS.accentLight,
    fontSize: 11,
    fontWeight: '600',
  },

  // ── PRESSABLE DOWNLOAD ─────────────────────
  downloadBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 50,
    elevation: 4,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  downloadBtnPressed: {
    backgroundColor: '#5b21b6',
  },
  downloadBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },

  // ── SECTION BOX ────────────────────────────
  sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.textDim,
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 16,
  },

  // ── SECTION LIST HEADER ────────────────────
  sectionHeader: {
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  sectionHeaderText: {
    color: COLORS.accentLight,
    fontWeight: '700',
    fontSize: 13,
  },

  // ── SKILL CARD ─────────────────────────────
  skillCard: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillName:    { color: COLORS.text,        fontWeight: '600', fontSize: 13 },
  skillPercent: { color: COLORS.accentLight, fontWeight: '700', fontSize: 13 },
  progressBg: {
    height: 6,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 4,
    // width & backgroundColor diset secara inline (dinamis dari data)
  },

  // ── TIMELINE CARD ──────────────────────────
  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginTop: 4,
    marginRight: 12,
  },
  timelineContent: { flex: 1 },
  timelineRole:    { color: COLORS.white,       fontWeight: '700', fontSize: 14, marginBottom: 2 },
  timelineCompany: { color: COLORS.accentLight, fontSize: 13,      marginBottom: 2 },
  timelinePeriod:  { color: COLORS.textMuted,   fontSize: 11,      marginBottom: 6 },
  timelineHint:    { color: COLORS.accentGold,  fontSize: 11,      fontStyle: 'italic' },

  // ── TEXT INPUT ─────────────────────────────
  textInput: {
    backgroundColor: '#0f172a',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 14,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  // ── LOADING ROW ────────────────────────────
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  loadingText: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
  },

  // ── MODAL ──────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#1e1b4b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    borderTopWidth: 3,
    borderColor: COLORS.accent,
  },
  modalTitle:        { color: COLORS.white,       fontSize: 20, fontWeight: '800', marginBottom: 4 },
  modalCompany:      { color: COLORS.accentLight, fontSize: 15, fontWeight: '600', marginBottom: 4 },
  modalPeriod:       { color: COLORS.textMuted,   fontSize: 13, marginBottom: 16 },
  modalDivider:      { height: 1, backgroundColor: COLORS.cardBorder, marginBottom: 16 },
  modalDesc:         { color: COLORS.text,        fontSize: 14, lineHeight: 22, marginBottom: 24 },
  modalCloseBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalCloseBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
});
